package utils

import (
	"fmt"
	"reflect"

	"github.com/dimiro1/banner"
	"github.com/mattn/go-colorable"
)

func If(condition bool, trueVal, falseVal interface{}) interface{} {
	if condition {
		return trueVal
	}
	return falseVal
}

func AppendError(existErr, newErr error) error {
	if existErr == nil {
		return newErr
	}

	return fmt.Errorf("%v, %w", existErr, newErr)
}


func IsEmpty(value any) bool {
	fmt.Println("=====")
	fmt.Println(value)
	return reflect.DeepEqual(value, reflect.Zero(reflect.TypeOf(value)).Interface())
}

/**
* @description: 打印banner
* @param {string} text banner标题
* @example
* 
templ := `{{ .Title "%s" "" 4 }}
	{{ .AnsiColor.BrightCyan }}The title will be ascii and indented 4 spaces{{ .AnsiColor.Default }}
	GoVersion: {{ .GoVersion }}
	GOOS: {{ .GOOS }}
	GOARCH: {{ .GOARCH }}
	NumCPU: {{ .NumCPU }}
	GOPATH: {{ .GOPATH }}
	GOROOT: {{ .GOROOT }}
	Compiler: {{ .Compiler }}
	ENV: {{ .Env "GOPATH" }}
	Now: {{ .Now "Monday, 2 Jan 2006" }}
	{{ .AnsiColor.BrightGreen }}This text will appear in Green
	{{ .AnsiColor.BrightRed }}This text will appear in Red{{ .AnsiColor.Default }}`
*/

func Banner(text string, serverInfo string){
	templ := `{{ .Title "%s" "" 4 }}
	{{ .AnsiColor.BrightCyan }}The title will be ascii and indented 4 spaces{{ .AnsiColor.Default }}
	GoVersion: {{ .GoVersion }}
	GOOS: {{ .GOOS }}
	GOARCH: {{ .GOARCH }}
	NumCPU: {{ .NumCPU }}
	GOPATH: {{ .GOPATH }}
	GOROOT: {{ .GOROOT }}
	Compiler: {{ .Compiler }}
	ENV: {{ .Env "GOPATH" }}
	Now: {{ .Now "Monday, 2 Jan 2006" }}
	{{ .AnsiColor.BrightGreen }}%s
	`

	bannerText := fmt.Sprintf(templ, text, serverInfo)
		 banner.InitString(colorable.NewColorableStdout(), true, true, bannerText)	
		 fmt.Println()
}