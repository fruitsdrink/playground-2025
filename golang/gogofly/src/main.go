package main

import "github.com/gogofly/cmd"

func main() {
	defer cmd.Clean()
	cmd.Start()
}
