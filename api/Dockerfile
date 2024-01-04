FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS builder
WORKDIR /source
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -r linux-musl-x64 -o /app

FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine
WORKDIR /app
COPY --from=builder /app .
# CMD ASPNETCORE_URLS=http://*:$PORT ./Confidate.WebAPI
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Confidate.WebAPI.dll
