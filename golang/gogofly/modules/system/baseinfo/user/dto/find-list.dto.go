package dto

import "github.com/gogofly/types"

type FindUserListDto struct {
	types.PaginationDto
	Keyword string `form:"keyword" json:"keyword" uri:"keyword"`
}