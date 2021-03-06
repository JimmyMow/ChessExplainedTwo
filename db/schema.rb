# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141030074041) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conversations", force: true do |t|
    t.string   "subject"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "games", force: true do |t|
    t.integer  "creator_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "sessionId"
    t.boolean  "public"
    t.boolean  "coach_mode",   default: false
    t.string   "white_player"
    t.string   "white_rating"
    t.string   "black_player"
    t.string   "black_rating"
    t.string   "result"
    t.string   "event"
    t.string   "opening"
    t.text     "pgn"
  end

  create_table "invitations", force: true do |t|
    t.integer  "inviter_id"
    t.integer  "invited_id"
    t.integer  "game_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "scheduled_at"
    t.boolean  "accepted"
  end

  create_table "messages", force: true do |t|
    t.integer  "user_id"
    t.integer  "conversation_id"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "moves", force: true do |t|
    t.integer  "game_id"
    t.string   "notation"
    t.string   "fen"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "eval"
  end

  create_table "rooms", force: true do |t|
    t.integer  "owner_id"
    t.string   "secure_token"
    t.string   "sessionId"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sandboxes", force: true do |t|
    t.integer  "creator_id"
    t.string   "sessionId"
    t.boolean  "public"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_conversations", force: true do |t|
    t.integer  "user_id"
    t.integer  "conversation_id"
    t.boolean  "deleted"
    t.boolean  "read"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "handle"
    t.boolean  "is_online"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "variation_moves", force: true do |t|
    t.integer  "variation_id"
    t.string   "notation"
    t.string   "fen"
    t.string   "eval"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "variations", force: true do |t|
    t.integer  "move_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
