using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
using WebFileManagerApi.Exceptions;
using WebFileManagerApi.Models;

namespace WebFileManagerApi
{
    public class Startup
    {
        const string SWAGGER_TITLE = "Web file manager API";
        const string SWAGGER_VERSION = "v0.1.0";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                };
            });

            services.AddRouting(options => options.LowercaseUrls = true);

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    IEnumerable<string> errors = context.ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                    throw new ApiException(errors.First(), HttpStatusCode.UnprocessableEntity);
                };
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(SWAGGER_VERSION, new Info
                {
                    Title = SWAGGER_TITLE,
                    Version = SWAGGER_VERSION
                });

                var xmlFile = Path.ChangeExtension(typeof(Startup).Assembly.Location, ".xml");
                c.IncludeXmlComments(xmlFile);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(context =>
                {
                    var exceptionHandlerPathFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();
                    var path = exceptionHandlerPathFeature?.Path;
                    var error = exceptionHandlerPathFeature?.Error;

                    int statusCode = (int)HttpStatusCode.InternalServerError;

                    if (error is ApiException apiException)
                    {
                        statusCode = apiException.StatusCode;
                    }

                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = statusCode;
                    var response = new ErrorApiResult(error.Message, statusCode);
                    return context.Response.WriteAsync(response.ToString());
                });
            });

            app.UseHttpsRedirection();
            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"/swagger/{SWAGGER_VERSION}/swagger.json", SWAGGER_TITLE);
            });
        }
    }
}
