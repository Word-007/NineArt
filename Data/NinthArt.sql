SET names utf8;
drop database if exists NinthArt;
create database NinthArt charset=utf8;
use NinthArt;
create table game_user(
uid int primary key auto_increment,
uname varchar(16)not null,
upwd varchar(16)not null,
email VARCHAR(25)not null,
country varchar(30)NOT null
);
