package cmd

import (
	"fmt"

	"github.com/gogofly/conf"
	"github.com/gogofly/global"
	"github.com/gogofly/modules"
	"github.com/gogofly/utils"
)

func Start() {
	conf.Init()	
	app := modules.Factory(modules.AppOptions{
		Name: global.Settings.Server.Name,
		Port: global.Settings.Server.Port,
		Cors: global.Settings.Server.Cors,
	})

	app.Run(func(options modules.AppOptions){
		
		startInfo := fmt.Sprintf("服务启动成功，监听端口：%d", options.Port)
		utils.Banner("GoGoFly", startInfo)		
		global.Logger.Info(startInfo)
	}, nil)
}

func Clean() {
	if(global.Logger != nil){
		global.Logger.Info("开始清理过程...")
	}else{
		fmt.Println("开始清理过程...")
	}
}
