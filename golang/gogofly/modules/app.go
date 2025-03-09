package modules

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gogofly/conf"
	"github.com/gogofly/global"
	"github.com/yyle88/eroticgo"
)

type AppOptions struct {
	Name string
	Port int
	Cors bool
}

type App struct {
	Options AppOptions
	modules []Module
}

// 初始化路由
func (a *App) initRouter() *gin.Engine {
	ginMode := "release"
	if(global.Settings.Mode.Dev){
		ginMode = "debug"
	}
	gin.SetMode(ginMode)
	fileWriter := conf.Logger
	gin.DefaultWriter = io.MultiWriter(fileWriter, os.Stdout)
	r := gin.Default()

	// 注册中间件,必须先注册中间件
	a.RegisterMiddlewares(r)

	publicRouterGroup := r.Group("/api/v1")
	authRouterGroup := r.Group("/api/v1")

	// 注入模块
	a.importModules()
	// 注册模块
	a.registerModules(publicRouterGroup, authRouterGroup)
	// 注册验证器
	a.RegisterValidator(r)
	// swagger
	a.initSwagger(r)
	return r
}

func Factory(options AppOptions) *App {
	return &App{
		Options: options,
	}
}

func (a *App) Run(cbFn func(options AppOptions), cbStop func(err error)) {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// 注册路由
	r := a.initRouter()

	port := a.Options.Port

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: r,
	}

	isRunning := true
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			isRunning = false
			panic("Start Server Error: " + err.Error())
		}
	}()

	// 启动成功，打印启动信息
	if isRunning {
		cbFn(a.Options)
	}

	<-ctx.Done()

	stop()
	fmt.Println(eroticgo.RED.Sprint("shutting down gracefully, press Ctrl+C again to force"))

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		if cbStop != nil {
			cbStop(err)
		}else{
			panic("Server forced to shutdown: " + err.Error())
		}
	}else{
		if cbStop!= nil {
			cbStop(nil)
		}else{
			fmt.Println(eroticgo.GREEN.Sprint("Server exiting"))
		}
	}
}