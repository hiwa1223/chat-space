# README

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :groups, through: :groups_users
  has_many :groups_users

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
### Association
- has_many :users
- has_many :groups, through: :groups_users
  has_many :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :groups
- belongs_to :users

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
### Association
- has many :users
- has_many :groups, through: :users
  has_many :groups_users