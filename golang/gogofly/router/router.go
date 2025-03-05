package router

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gogofly/global/types"
	"github.com/gogofly/router/auth"
	baseInfo "github.com/gogofly/router/baseinfo"
	"github.com/gogofly/utils"
	"github.com/spf13/viper"
	"github.com/yyle88/eroticgo"
)

var (
	routes []types.IFnRegisterRoute
)

func registerRoute(fn types.IFnRegisterRoute) {
	if fn == nil {
		return
	}
	routes = append(routes, fn)
}

func initRoutes() {
	auth.Init(registerRoute)
	baseInfo.Init(registerRoute)
}

func initRouter() *gin.Engine {
	r := gin.Default()

	publicRouterGroup := r.Group("/api/v1")
	authRouterGroup := r.Group("/api/v1")

	initRoutes()

	for _, route := range routes {
		route(publicRouterGroup, authRouterGroup)
	}

	return r
}

func RunServer() {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	r := initRouter()

	port := viper.GetString("server.port")
	if port == "" {
		port = "8080"
	}

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: r,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Start Server Error: %s\n", err)
			return
		}
	}()

	utils.ShowBanner()
	startInfo := fmt.Sprintf("Server Start at: %s", port)
	fmt.Println(eroticgo.GREEN.Sprint(startInfo))

	<-ctx.Done()

	stop()
	log.Println("shutting down gracefully, press Ctrl+C again to force")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown: ", err)
	}

	log.Println("Server exiting")
}
