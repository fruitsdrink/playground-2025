package cmd

import (
	"fmt"

	"github.com/gogofly/conf"
	"github.com/gogofly/global"
	"github.com/gogofly/router"
)

func Start() {
	conf.Init()	
	router.RunServer()
}

func Clean() {
	if(global.Logger != nil){
		global.Logger.Info("开始清理过程...")
	}else{
		fmt.Println("开始清理过程...")
	}
}
