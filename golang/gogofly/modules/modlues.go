package modules

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/core"
	"github.com/gogofly/modules/system"
)

type Module interface {
	Init(r *gin.Engine, publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup)
}

func (a *App) importModules() {
	a.modules = append(a.modules, core.NewModule())
	a.modules = append(a.modules, system.NewModule())
}

/**
 * 注册模块到app
 * @param r gin engine
 * @param prg public router group
 * @param arg auth router group
 */
func (a *App) registerModules(r *gin.Engine, prg *gin.RouterGroup, arg *gin.RouterGroup) {
	for _, module := range a.modules {
		// 打印module的内存地址
		if module != nil {
			module.Init(r, prg, arg)
		}
	}
}

