# INXPIX Analytic Serivice API Guidelines

## 1. Inserting new Analytic
Send a `POST` request to `/` path.
Expected requestbody:
```json
{
  "cctvId": number,
  "personId": number,
  "status": number,
}

```

## 2. Get analytics by single CCTV
Send a `GET` request to `/:id`, with `:id` as `Route Parameter`

## 3. Get analytics by multiple CCTV
Send a `GET` request to `/` with query parameters with the format of `?id[]=1&id[]=2` where `1` and `2` are CCTV id(s)
