package modules

import (
	"context"
	"fmt"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gogofly/global"
	"github.com/gogofly/utils"
	"github.com/yyle88/eroticgo"
)

type AppOptions struct {
	Name string
	Port int
}

type AppCallbackFnOptions struct {
	AppOptions
	Banner string
}
type App struct {
	modules []Module
}

// 初始化路由
func (a *App) initRouter() *gin.Engine {
	ginMode := "release"
	if(global.Settings.Mode.Dev){
		ginMode = "debug"
	}
	gin.SetMode(ginMode)
	r := gin.Default()

	publicRouterGroup := r.Group("/api/v1")
	authRouterGroup := r.Group("/api/v1")

	// 注入模块
	a.importModules()
	// 注册模块
	a.registerModules(r, publicRouterGroup, authRouterGroup)

	// swagger
	a.initSwagger(r)
	return r
}

func Factory() *App {
	return &App{}
}

func (a *App) Run(options AppOptions, cbFn func(opt AppCallbackFnOptions), cbStop func(err error)) {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	r := a.initRouter()

	port := options.Port

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
		opts := AppCallbackFnOptions{
			AppOptions: options,
			Banner: utils.GetBanner(),
		}
		cbFn(opts)
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