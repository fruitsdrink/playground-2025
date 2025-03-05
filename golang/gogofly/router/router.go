package router

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/global/types"
	"github.com/gogofly/router/auth"
	baseInfo "github.com/gogofly/router/baseinfo"
	"github.com/spf13/viper"
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

func InitRouter() {
	r := gin.Default()

	publicRouterGroup := r.Group("/api/v1")
	authRouterGroup := r.Group("/api/v1")

	initRoutes()

	for _, route := range routes {
		route(publicRouterGroup, authRouterGroup)
	}

	port := viper.GetString("server.port")
	if port == "" {
		port = "8080"
	}

	err := r.Run(":" + port)
	if err != nil {
		panic("Start Server Error: " + err.Error())
	}
}
