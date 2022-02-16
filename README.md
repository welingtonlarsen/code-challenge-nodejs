<div align="center">

![](https://img.shields.io/badge/Status-Done-brightgreen)
</div>

<div align="center">

# Code-Challenge NodeJS

![](https://img.shields.io/badge/Autor-Welington%20Larsen-brightgreen)
![](https://img.shields.io/badge/Language-Typescript-brightgreen)
![](https://img.shields.io/badge/Framework-Express-brightgreen)
![](https://img.shields.io/badge/Database-MySQL-brightgreen)
![](https://img.shields.io/badge/Cache-Redis-brightgreen)
</div> 

## Local prerequisites
- Node.js (16.14.0 is recommended)
- Docker

## Execution
  ### Local infra
    docker-compose up -d

  ### Database migration (necessary only at the first time)
    yarn migration
  
  ### Install dependencies
    yarn install

  ### Development environment app start
    yarn dev
  
  ### Run unit tests
    yarn test

## Examples
  - Schedule courses
      #### Http Request
      - URL: ```http://localhost:3333/studyschedule```
      - Method: POST

      #### Payload
        {
          "userId": "asdjfhasldf",
          "courses": [
              {
                "desiredCourse":"PortfolioConstruction",
                "requiredCourse":"PortfolioTheories"
              },
              {
                "desiredCourse":"InvestmentManagement",
                "requiredCourse":"Investment"
              },
              {
                "desiredCourse":"Investment",
                "requiredCourse":"Finance"
              },
              {
                "desiredCourse":"PortfolioTheories",
                "requiredCourse":"Investment"
              },
              {
                "desiredCourse":"InvestmentStyle",
                "requiredCourse":"InvestmentManagement"
              }
          ]
        }

      #### Success Response
      - HTTP Status Code: 201
      - Response Body:
        
            {
              "userId": "asdjfhasldf",
              "coursesSequence": [
                  "Finance",
                  "InvestmentManagement",
                  "PortfolioTheories",
                  "InvestmentStyle",
                  "PortfolioConstruction"
              ]
            }

    #### Validation Error Response
    - HTTP Status Code: 400
    - Response Body:
    
            {
              "errors": [
                {
                    "property": "userId",
                    "children": [],
                    "constraints": {
                        "isNotEmpty": "userId should not be empty"
                    }
                }
            }