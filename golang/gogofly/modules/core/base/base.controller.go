package base

import (
	"fmt"
	"net/http"
	"reflect"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/gogofly/types"
)

type BaseController struct {
	Base
}

func (b *BaseController) TryCatchWithStatus(ctx *gin.Context, fn func() (any, int, error)) {
	defer func() {
		if r := recover(); r != nil {
			b.FailWithInternal(ctx)
		}
	}()
	data, status, err := fn()
	if err != nil {
		if status == 0 || status == http.StatusOK {
			status = http.StatusInternalServerError
		}
		b.FailWithCode(ctx, status, 0, err.Error())
		return
	}
	b.OK(ctx, data)
}

func (b *BaseController) OK(ctx *gin.Context, data any) {
	ctx.AbortWithStatusJSON(http.StatusOK, types.ResponseJson[any]{
		Msg: "success",
		Data: data,
	})
}


func (b *BaseController) FailWithCode(ctx *gin.Context, status int, code int, msg string) {
	ctx.AbortWithStatusJSON(status, types.ResponseJson[any]{
		Code: code,
		Msg: msg,
		Data: nil,
	})
}

func (b *BaseController) Fail(ctx *gin.Context, status int, msg string) {
	b.FailWithCode(ctx, status, 0, msg)
}

func (b *BaseController) FailWithBadRequest(ctx *gin.Context, msg string) {
	b.FailWithCode(ctx, http.StatusBadRequest, 0, msg)
}

func (b *BaseController) FailWithNotFound(ctx *gin.Context, msg string) {
	b.FailWithCode(ctx, http.StatusNotFound, 0, msg)
}

func (b *BaseController) FailWithUnauthorized(ctx *gin.Context) {
	b.FailWithCode(ctx, http.StatusUnauthorized, 0, "Unauthorized")
}

func (b *BaseController) FailWithForbidden(ctx *gin.Context) {
	b.FailWithCode(ctx, http.StatusForbidden, 0, "Forbidden")
}

func (b *BaseController) FailWithInternal(ctx *gin.Context) {
	b.FailWithCode(ctx, http.StatusInternalServerError, 0, "Internal Server Error")
}

func (b *BaseController) SendFile(ctx *gin.Context, fileName string, data []byte) {
	ctx.Header("Content-Disposition", "attachment; filename="+fileName)
	ctx.Data(http.StatusOK, "application/octet-stream", data)
}

func (b *BaseController) SendPicture(ctx *gin.Context, fileName string, data []byte) {
	ctx.Header("Content-Disposition", "attachment; filename="+fileName)
	ctx.Data(http.StatusOK, "image/jpeg", data)
}

/**
* 解析验证器错误
* @param errs validator.ValidationErrors 验证器错误
* @param target any 目标结构体的指针
*/	
func (b *BaseController) ParseValidatorErrors(errs error, target any, cbFn func(target any) (string, map[string]string)) (string, map[string]string) {

	// 判断errs是否是validator.ValidationErrors类型
	if _, ok := errs.(validator.ValidationErrors); !ok {
		if errs.Error() == "EOF" {
			return "参数不能为空", nil
		}
		return errs.Error(), nil
	}

	var msg string
	errors := make(map[string]string)

	fields := reflect.TypeOf(target).Elem()
	
	for _, fieldErr := range errs.(validator.ValidationErrors){
		// 获取错误字段
		field, _ := fields.FieldByName(fieldErr.Field())
		// 获取错误字段的标签
		errMessageTag := fmt.Sprintf("%s_err", fieldErr.Tag())
		errMessage := field.Tag.Get(errMessageTag)
		if errMessage == "" {
			errMessage = field.Tag.Get("message")
		}

		label := field.Tag.Get("label")
		if label == "" {
			label = field.Tag.Get("json")
		}
		if label == "" {
			label = fieldErr.Field()
		}

		if errMessage == "" {
			// errMessage = fieldErr.Error()
			errMessage = fmt.Sprintf("%s %s error", label, fieldErr.Tag())
		}
		msg += errMessage + ";"
		if label != ""{
			errors[label] = errMessage
		}
	}
	if cbFn != nil {
		cbFnMsg, cbFnErrors := cbFn(target)
		if cbFnMsg!= "" {
			msg = msg + ";" + cbFnMsg			
		}
		if len(cbFnErrors) > 0 {
			for k, v := range cbFnErrors {
				errors[k] = v
			}
		}
	}
	return msg, errors
}

func (b *BaseController) ParseDtoWithCustomerValidate(ctx *gin.Context, target any, cbFn func(target any) (string, map[string]string)) bool {
	if err := ctx.ShouldBind(target); err != nil {
		msg, errors := b.ParseValidatorErrors(err, target, cbFn)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"msg": msg,
			"errors": errors,
		})
		return false
	}
	return true
}

func (b *BaseController) ParseDto(ctx *gin.Context, target any) bool {
	return b.ParseDtoWithCustomerValidate(ctx, target, nil)
}

func (b *BaseController) ParamInt(ctx *gin.Context, key string) int{
	val, err := strconv.ParseInt(ctx.Param(key), 10, 64)
	if err!= nil {
		return 0
	}

	return int(val)
}

func (b *BaseController) ParamUint(ctx *gin.Context, key string) uint{
	val, err := strconv.ParseUint(ctx.Param(key), 10, 64)
	if err!= nil {
		return 0
	}
	return uint(val)
}