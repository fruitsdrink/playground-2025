package modules

import (
	"github.com/gin-gonic/gin"
	docs "github.com/gogofly/docs"
	"github.com/gogofly/global"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func (a *App) initSwagger(r *gin.Engine) {
	docs.SwaggerInfo.Title = global.Settings.Swagger.Title
	docs.SwaggerInfo.Description = global.Settings.Swagger.Description
	docs.SwaggerInfo.Version = global.Settings.Swagger.Version

	r.GET(global.Settings.Swagger.Path, ginSwagger.WrapHandler(swaggerfiles.Handler))
}