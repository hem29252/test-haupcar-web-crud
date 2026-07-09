## RESTful API

### Get Cars

Retrieve a paginated list of cars.

**Endpoint**

```http
GET /cars
```

**Query Parameters**

| Parameter   | Type     | Description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `page`      | `number` | Page number.                                    |
| `limit`     | `number` | Number of items per page.                       |
| `search`    | `string` | Search by registration number, brand, or model. |
| `startDate` | `string` | Filter by start date.                           |
| `endDate`   | `string` | Filter by end date                              |

Example:

```http
GET /cars?page=1&limit=10&search=toyota&startDate=2026-01-01&endDate=2026-12-31
```

---

### Get a Car

Retrieve a single car by its ID.

**Endpoint**

```http
GET /car/:carId
```

**Path Parameters**

| Parameter | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| `carId`   | `string` | The unique identifier of the car. |

Example:

```http
GET /car/550e8400-e29b-41d4-a716-446655440000
```

---

### Create a Car

Create a new car.

**Endpoint**

```http
POST /car
```

**Request Body**

```json
{
  "registration_number": "ABC123",
  "brand": "Toyota",
  "model": "Corolla",
  "notes": "Company vehicle"
}
```

---

### Update a Car (Partial)

Update one or more fields of an existing car.

**Endpoint**

```http
PATCH /car/:carId
```

**Path Parameters**

| Parameter | Type     |
| --------- | -------- |
| `carId`   | `string` |

**Request Body**

```json
{
  "registration_number": "ABC123",
  "brand": "Toyota",
  "model": "Corolla Altis",
  "notes": "Updated notes"
}
```

---

### Replace a Car

Replace all information for an existing car.

**Endpoint**

```http
PUT /car/:carId
```

**Path Parameters**

| Parameter | Type     |
| --------- | -------- |
| `carId`   | `string` |

**Request Body**

```json
{
  "registration_number": "ABC123",
  "brand": "Toyota",
  "model": "Corolla",
  "notes": "Company vehicle"
}
```

---

### Delete a Car

Delete a car by its ID.

**Endpoint**

```http
DELETE /car/:carId
```

**Path Parameters**

| Parameter | Type     |
| --------- | -------- |
| `carId`   | `string` |

Example:

```http
DELETE /car/550e8400-e29b-41d4-a716-446655440000
```
