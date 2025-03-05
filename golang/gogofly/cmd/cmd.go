package cmd

import (
	"fmt"

	"github.com/gogofly/conf"
	"github.com/gogofly/router"
)

func Start() {
	conf.InitConfig()
	router.InitRouter()
}

func Clean() {
	fmt.Println("======Clean=====")
}
