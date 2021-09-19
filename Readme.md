# Manual Técnico

## Arquitectura de la aplicación

![alt text](Manuales/arq.png?raw=true)

La arquitectura contiene 1 vpc que tiene 3 subredes, 1 privada y 2 publicas. En la subred privada esta la base de datos rds.
Se contiene un bucket publico en donde se guardan los archivos subidos desde la aplicación. En las subredes publicas se tienen 2 instancias con el servidor de node js, ademas se tiene un load balancer hacia las 2 instancias.
La aplicacion de react esta ubicada en un bucket publico de S3.

# Usuario IAM

![alt text](Manuales/iam.png?raw=true)

![alt text](Manuales/iam-config.png?raw=true)

# VPC


![alt text](Manuales/vpc.png?raw=true)

### Subredes
![alt text](Manuales/vpc-subnet.png?raw=true)

### Route Tables
![alt text](Manuales/routetable.png?raw=true)

### Security Group

![alt text](Manuales/securityG.png?raw=true)

### Internet Gateway

![alt text](Manuales/igateway.png?raw=true)

# S3

![alt text](Manuales/s3.png?raw=true)

# EC 2

![alt text](Manuales/loadbalancer.png?raw=true)

# Load Balancer

![alt text](Manuales/loadbalancer.png?raw=true)

# RDS

![alt text](Manuales/db1.png?raw=true)

### RDS securidad

![alt text](Manuales/db-sec.png?raw=true)
