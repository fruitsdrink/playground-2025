package main

import (
	"github.com/gogofly/cmd"
	"github.com/joho/godotenv"
)

func init() {
	err:= godotenv.Load()
	if err != nil {
		panic("Load .env Error: " + err.Error())
	}
}

func main() {
	defer cmd.Clean()
	cmd.Start()
}
