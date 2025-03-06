package api

import (
	"github.com/gogofly/api/auth"
	"github.com/gogofly/api/baseinfo"
)

var AuthApi = auth.NewAuthApi()
var BaseInfoApi = baseinfo.NewBaseInfoApi()
