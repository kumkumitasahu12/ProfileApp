# Use the official .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy the .csproj file and restore dependencies
COPY API/MyProfile.API/*.csproj ./
RUN dotnet restore

# Copy the rest of the application code
COPY API/MyProfile.API/. ./
RUN dotnet publish -c Release -o out

# Use the official ASP.NET image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out ./

# Specify the command to run the application
ENTRYPOINT ["dotnet", "MyProfile.API.dll"]
