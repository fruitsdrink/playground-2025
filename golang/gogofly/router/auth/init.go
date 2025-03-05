package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/global/types"
)

func Init(registerRouteFn types.IFnInitRoute) {
	registerRouteFn(func(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
		authGroup := authRouterGroup.Group("/auth")
		authGroup.POST("/login", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"code": 200,
				"msg":  "login success",
			})
		})
	})
}
