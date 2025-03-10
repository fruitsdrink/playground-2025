package types

import "reflect"



type ResponseJson[T any] struct {
	Status int `json:"-"`
	Code int `json:"code,omitempty"`
	Msg string `json:"msg,omitempty"`
	Data T `json:"data,omitempty"`
}

type FindListData[T any] struct {
	Items []*T `json:"items"`
	Total int64 `json:"total"`
}

func (r *ResponseJson[T]) IsEmpty() bool {
	return reflect.DeepEqual(r, &ResponseJson[T]{})
}

