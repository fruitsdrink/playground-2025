package middleware

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	config := cors.DefaultConfig()
	config.AllowCredentials = true
	config.AllowHeaders = []string{"*"}
	config.AllowMethods = []string{"*"}
	config.AllowOriginFunc = func(origin string) bool {
		return true
	}
	return cors.New(config)
}