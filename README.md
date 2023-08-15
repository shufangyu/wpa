PHP
---

```text-x-sh
sudo pacman -Syu php composer
composer global require "laravel/installer"
```

**Composer directory:** `~/.config/composer`

### MySQL Support

Uncomment the following lines in `/etc/php/php.ini`:

```text-x-sh
extension=pdo_mysql
extension=mysqli
```

IPFS
----

```text-x-sh
sudo pacman -Syu kubo
ipfs init
ipfs id
ipfs daemon &; disown
ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme
```

**RPC API:** 127.0.0.1:5001  
**WebUI:** [http://127.0.0.1:5001/webui](http://127.0.0.1:5001/webui)  
**Gateway server:** 127.0.0.1:8080  
**Config:** ~/.ipfs/config

XAMPP
-----

```text-x-sh
pamac install xampp
sudo xampp start
```

**Directory:** `/opt/lampp`  
**Config:**

*   `/opt/lampp/etc/httpd.conf`
*   `/opt/lampp/etc/php.ini`
*   `/opt/lampp/phpmyadmin/config.inc.php`

Ganache
-------

```text-x-sh
sudo npm install ganache --global
ganache --server.port 8545 --database.dbPath ~/ganache --wallet.mnemonic "mail fashion globe unhappy deliver famous derive actress artwork loan scout cradle"
```

Create Ethereum account for oracle. Use that account to first deploy the ERC20 and then the `SI_file` contract using [remix](https://remix.ethereum.org/).

Backend
-------

Create the following directories:

*   /public/storage/ipfsGet
*   /public/ipfsGet
*   /storage/ipfsGet

Edit the following files and uncomment Linux specific lines:

*   /app/Http/Controllers/FileController.php
*   /config/bloomfilter.php

Create database `si_backend` via [phpMyAdmin](http://localhost/phpmyadmin/index.php?route=/database/structure&db=si_backend).

```text-x-sh
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed --class=BloomfiltersTableSeeder
php artisan storage:link
php artisan serve --port=8000
```

Frontend
--------

```text-x-sh
python -m http.server 8999
chromium --remote-debugging-port=9222
```
