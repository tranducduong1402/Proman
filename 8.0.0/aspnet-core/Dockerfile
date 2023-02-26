FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /src
COPY ["src/Proman.Web.Host/Proman.Web.Host.csproj", "src/Proman.Web.Host/"]
COPY ["src/Proman.Web.Core/Proman.Web.Core.csproj", "src/Proman.Web.Core/"]
COPY ["src/Proman.Application/Proman.Application.csproj", "src/Proman.Application/"]
COPY ["src/Proman.Core/Proman.Core.csproj", "src/Proman.Core/"]
COPY ["src/Proman.EntityFrameworkCore/Proman.EntityFrameworkCore.csproj", "src/Proman.EntityFrameworkCore/"]
WORKDIR "/src/src/Proman.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/Proman.Web.Host", "src/Proman.Web.Host"]
COPY ["src/Proman.Web.Core", "src/Proman.Web.Core"]
COPY ["src/Proman.Application", "src/Proman.Application"]
COPY ["src/Proman.Core", "src/Proman.Core"]
COPY ["src/Proman.EntityFrameworkCore", "src/Proman.EntityFrameworkCore"]
WORKDIR "/src/src/Proman.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "Proman.Web.Host.dll"]
