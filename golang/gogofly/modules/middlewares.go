package modules

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/middleware"
)

func (a *App) RegisterMiddlewares(r *gin.Engine) {
	if a.Options.Cors {
		r.Use(middleware.Cors())
	}

	// http日志
	r.Use(middleware.HttpLog())
}