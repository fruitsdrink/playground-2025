package test

import (
	"encoding/json"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

var rootDir string          // 根目录
var separator string        // 分隔符
var jsonData map[string]any // Json数据

const jsonFileName = "dir.json" // Json文件名

/**
 * 加载Json数据
 */
func loadJson() {
	separator = string(filepath.Separator)

	currentDir, _ := os.Getwd()
	rootDir = currentDir[:strings.LastIndex(currentDir, separator)]

	bytes, _ := os.ReadFile(currentDir + separator + jsonFileName)
	err := json.Unmarshal(bytes, &jsonData)
	if err != nil {
		panic("Load Json Data Error: " + err.Error())
	}
}

/**
 * 解析Json数据
 */
func parseMap(data map[string]any, parentDir string) {
	for k, v := range data {

		switch v := v.(type) {
		case string:
			{
				if k == "name" {
					path := v
					if path == "" {
						continue
					}

					if parentDir != "" {
						path = parentDir + separator + path
					}

					parentDir = path

					createDir(path)
				}
			}
		case []any:
			{
				parseArray(v, parentDir)
			}
		}
	}
}

/**
 * 解析数组
 */
func parseArray(jsonData []any, parentDir string) {
	for _, v := range jsonData {
		parseMap(v.(map[string]any), parentDir)
	}
}

/**
 * 创建目录
 */
func createDir(path string) {
	if path == "" {
		return
	}

	// fmt.Println(path)
	err := os.MkdirAll(rootDir+separator+path, fs.ModePerm)
	if err != nil {
		panic("Create Dir Error: " + err.Error())
	}
}

/**
 * 测试生成目录
 */
func TestGenerateDir01(t *testing.T) {
	loadJson()
	parseMap(jsonData, "")
}
