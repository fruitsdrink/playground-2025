package baseinfo

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func InitUserRoutes(baseInfoGroup *gin.RouterGroup) {
	userGroup := baseInfoGroup.Group("/user")

	userGroup.GET("/", func(ctx *gin.Context) {
		ctx.AbortWithStatusJSON(http.StatusOK, gin.H{
			"data": []map[string]any{
				{
					"id":   1,
					"name": "admin",
				},
				{
					"id":   2,
					"name": "test",
				},
			},
		})
	})

	userGroup.GET("/:id", func(ctx *gin.Context) {
		ctx.AbortWithStatusJSON(http.StatusOK, gin.H{
			"data": map[string]any{
				"id":   ctx.Param("id"),
				"name": "admin",
			},
		})
	})

	userGroup.GET("/info", func(ctx *gin.Context) {
		ctx.AbortWithStatusJSON(http.StatusOK, gin.H{
			"message": "info",
		})
	})
}
