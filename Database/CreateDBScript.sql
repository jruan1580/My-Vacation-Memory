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