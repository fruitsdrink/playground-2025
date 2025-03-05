package test

import (
	"encoding/json"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

type Node struct {
	Name        string `json:"name"`
	Description string `json:"description,omitempty"`
	Children    []Node `json:"children,omitempty"`
}

var rootDir02 string
var separator02 string
var rootNode Node

const jsonFileName02 = "dir.json"

func loadJson02() {
	separator02 = string(filepath.Separator)
	workDir, _ := os.Getwd()

	rootDir02 = workDir[:strings.LastIndex(workDir, separator02)]

	jsonBytes, _ := os.ReadFile(workDir + separator02 + jsonFileName02)

	err := json.Unmarshal(jsonBytes, &rootNode)

	if err != nil {
		panic("Load Json Data Error: " + err.Error())
	}

}

func parseNode(node Node, parentDir string) {
	if node.Name != "" {
		createDir02(node, parentDir)
	}

	if parentDir != "" {
		parentDir = parentDir + separator02
	}

	if node.Name != "" {
		parentDir = parentDir + node.Name
	}

	if len(node.Children) > 0 {
		for _, child := range node.Children {
			parseNode(child, parentDir)
		}
	}
}

func createDir02(node Node, parentDir string) {
	dirPath := rootDir02 + separator02
	if parentDir != "" {
		dirPath = dirPath + parentDir
	}
	dirPath = dirPath + separator02 + node.Name
	// fmt.Print(dirPath + "\n")
	err := os.MkdirAll(dirPath, fs.ModePerm)
	if err != nil {
		panic("Create Dir Error: " + err.Error())
	}
}

func TestGenerateDir02(t *testing.T) {
	loadJson02()
	parseNode(rootNode, "")
}
