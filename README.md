# README

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null:false|
|image|string|null: false|
|group-id|integer|null: false, foreign_key: true|
|user-id|integer|null: false, foreign_key: true|
### Association
- has_many :message
- has_many :group,

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|text|null: false|
### Association
- has_many :user
- has_many :group, through: :user

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|text|null: false|
### Association
- belongs_to :user
- has_many :group, through: :user
