package model

import systemModel "github.com/gogofly/model/system"

var Models []any

func init() {
	Models = append(Models, &systemModel.User{})
}	