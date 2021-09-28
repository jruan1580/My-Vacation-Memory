using System;
using GraphQL;
using GraphQL.Server;
using GraphQL.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using VacationManagement.API.Types;
using VacationManagement.Domain.Mapper;
using VacationManagement.Domain.Services;
using VacationManagement.Infrastructure.Repository;

namespace VacationManagement.API
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MapperProfile));

            services.AddScoped<IDocumentExecuter, DocumentExecuter>();
            services.AddSingleton<ITripsRepository, TripsRepository>();
            services.AddSingleton<IAttractionsRepository, AttractionsRepository>();
            services.AddSingleton<IRestaurantRepository, RestaurantRepository>();
            services.AddScoped<IMyTripsService, MyTripsService>();
            services.AddScoped<TripType>();
            services.AddScoped<AddTripInputType>();
            services.AddScoped<VacationManagementQueryType>();
            services.AddScoped<VacationManagementMutationType>();
            services.AddScoped<VacationManagementSchema>();

            services.AddGraphQL()
                .AddSystemTextJson()
                .AddErrorInfoProvider(opt => opt.ExposeExceptionStackTrace = true);


            services.AddCors(options =>
            {
                options.AddPolicy("DefaultPolicy", builder =>
                {
                    builder.AllowAnyHeader()
                           .AllowAnyMethod()
                           .WithOrigins("http://localhost:3000");
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("DefaultPolicy");

            app.UseGraphQL<VacationManagementSchema>();

            app.UseGraphQLAltair("/");
         
            //app.UseHttpsRedirection();

            //app.UseRouting();

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapGet("/", async context =>
            //    {
            //        await context.Response.WriteAsync("Hello World!");
            //    });
            //});
        }
    }
}
