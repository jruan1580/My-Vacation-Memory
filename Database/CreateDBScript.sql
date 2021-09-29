use master;
If(DB_ID(N'MyVacationMemory') is not null)
begin
	drop database MyVacationMemory;
end;
go

create database MyVacationMemory;
go

use MyVacationMemory;

-- create tables --
create table dbo.Trips
(
	Id bigint not null primary key identity(1,1),
	TripName varchar(255) not null,
	Destination nvarchar(500) not null,
	TripDescription nvarchar(max) null,
	StartDate datetime2(7) not null,
	EndDate datetime2(7) null, -- if not ended, this will be null
	Rating smallint not null
);

create table dbo.Attractions
(
	Id bigint not null primary key identity(1,1),
	AttractionName varchar(max) not null,
	[Description] varchar(max)  not null,
	[Location] varchar(500) not null,
	Cost decimal(10,2) not null,
	TripId bigint foreign key references dbo.Trips(Id)
);

create table dbo.Restaurants
(
	Id bigint not null primary key identity(1, 1),
	RestaurantName varchar(500) not null,
	Style varchar(255) not null,
	LowerCostRange decimal(10,2) not null,
	UpperCostRange decimal(10, 2) not null,	
	TripId bigint foreign key references dbo.Trips(Id)
);