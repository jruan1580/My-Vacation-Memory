use master;
If(DB_ID(N'MyVacationMemory') is not null)
begin
	drop database MyVacationMemory;
end;
go

create database MyVacationMemory;
go

use MyVacationMemory;