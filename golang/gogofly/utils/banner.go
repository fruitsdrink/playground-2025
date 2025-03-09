package utils

import (
	"fmt"
	"os"
)

const fileName = "banner.txt"
const dirName = "resources"

func GetBanner() string {
	banner, err := os.ReadFile(dirName + "/" + fileName)
	if err != nil {
		return ""
	} else {
		return string(banner)
	}

}
func ShowBanner() {
	banner := GetBanner()
	if banner != "" {
		fmt.Printf("\n\n%s\n\n", banner)
	}
}
