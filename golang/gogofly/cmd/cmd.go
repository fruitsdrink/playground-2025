package cmd

import (
	"fmt"

	"github.com/gogofly/conf"
	"github.com/gogofly/global"
	"github.com/gogofly/modules"
	"github.com/yyle88/eroticgo"
)

func Start() {
	conf.Init()	
	app := modules.Factory()

	app.Run(modules.AppOptions{
		Name: global.Settings.Server.Name,
		Port: global.Settings.Server.Port,
	}, func (opts modules.AppCallbackFnOptions){
		if opts.Banner != "" {
			fmt.Printf("\n\n%s\n\n", opts.Banner)
		}

		startInfo := fmt.Sprintf("服务启动成功，监听端口：%d\n", opts.Port)
		fmt.Println(eroticgo.GREEN.Sprint(startInfo))
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
