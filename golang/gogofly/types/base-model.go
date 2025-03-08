package types

import (
	"time"

	"gorm.io/gorm"
)

type BaseModel struct {
	CreatedAt time.Time `gorm:"not null;autoCreateTime;comment:'创建时间'" json:"createdAt"`
	CreatedBy *uint `gorm:"comment:'创建人Id'" json:"createdBy"`
	UpdatedAt *time.Time `gorm:"autoUpdateTime;comment:'更新时间'" json:"updatedAt"`
	UpdatedBy *uint `gorm:"comment:'更新人Id'" json:"updatedBy"`
	DeletedAt gorm.DeletedAt `gorm:"comment:'删除时间'" json:"deletedAt"`
	DeletedBy *uint `gorm:"comment:'删除人Id'" json:"deletedBy"`
	Remark *string `gorm:"comment:'备注'" json:"remark"`
	Sort int `gorm:"not null;default:0;comment:'排序'" json:"sort"`
}

type BaseModelWithId struct {
	Id uint `gorm:"primarykey;autoIncrement;comment:'主键Id'" json:"id"`
	BaseModel
}

type UUIDBaseModel struct {
	Id string `gorm:"primarykey;size:36;default:uuid_generate_v4();comment:'主键Id'" json:"id"`
	BaseModel
}

// func (base *UUIDBaseModel) BeforeCreate(tx *gorm.DB) error {
// 	uuid := uuid.NewV4().String()
// 	tx.Statement.SetColumn("id", uuid)
// 	return nil
// }