package router

import (
	"context"
	"fmt"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"github.com/gogofly/global"
	"github.com/gogofly/router/system"
	"github.com/yyle88/eroticgo"

	"github.com/gin-gonic/gin"
	docs "github.com/gogofly/docs"
	"github.com/gogofly/utils"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)




func initRoutes(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	system.Init(publicRouterGroup, authRouterGroup)
}

func initRouter() *gin.Engine {
	ginMode := "release"
	if(global.Settings.Mode.Dev){
		ginMode = "debug"
	}
	gin.SetMode(ginMode)
	r := gin.Default()

	publicRouterGroup := r.Group("/api/v1")
	authRouterGroup := r.Group("/api/v1")

	initRoutes(publicRouterGroup, authRouterGroup)

	// swagger
	initSwagger(r)
	return r
}

func initSwagger(r *gin.Engine) {
	docs.SwaggerInfo.Title = global.Settings.Swagger.Title
	docs.SwaggerInfo.Description = global.Settings.Swagger.Description
	docs.SwaggerInfo.Version = global.Settings.Swagger.Version

	r.GET(global.Settings.Swagger.Path, ginSwagger.WrapHandler(swaggerfiles.Handler))
}

func RunServer() {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	r := initRouter()

	port := global.Settings.Server.Port
	name := global.Settings.Server.Name

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: r,
	}

	isRunning := true
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			isRunning = false
			global.Logger.Fatalf("Start Server Error: %s\n", err)
			return
		}
	}()

	// 启动成功，打印启动信息
	if isRunning {
		utils.ShowBanner()
		startInfo := fmt.Sprintf("%s Server Start at: %d", name, port)
		fmt.Println(eroticgo.GREEN.Sprint(startInfo + "\n"))
		global.Logger.Info(startInfo)
	}

	<-ctx.Done()

	stop()
	global.Logger.Info("shutting down gracefully, press Ctrl+C again to force")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		global.Logger.Fatal("Server forced to shutdown: ", err)
	}

	global.Logger.Info("Server exiting")
}
