const {PRE, PREClient, PREProxy} = require("eff-pre");
const crypto = require("crypto");
const CryptoJS = require('crypto-js');

const L0 = 32; // longest byte size can be encrypted
const L1 = 16; // customized length
// PRE.init(L0, L1, PRE.CURVE.SECP256K1).then(() => {
//   const A = new PREClient();
//   const B = new PREClient();
//   const C = new PREClient();
//   // the message to be encrypted
//   // it should be no longer than L0, usually AES key
//   const M = crypto.randomBytes(L0);
//   A.keyGen();
//   B.keyGen();
//   C.keyGen();
//   const pkA = A.getPk();
//   const pkB = B.getPk();
//   /*console.log('M:');
//   console.log(M);
//   console.log(M.toString('hex'));*/
//   /*
//   const words = '10.0.0.1'
//   //const secretKey = 'ThisIsMyKey'
//   const secretKey = M.toString('hex');
//   console.log(`Before encrypt => ${words}`)
//   // Encrypt
//   const ciphertext = CryptoJS.AES.encrypt(words, secretKey).toString()
//   console.log(`After encrypt => ${ciphertext}`)
//   // Decrypt
//   const originalText = CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8)
//   console.log(`After decrypt => ${originalText}`)
//   */
//   /*console.log('-----');
//   const skA = A.getSk();
//   var SKA = skA.toString('hex');
//   console.log(SKA);
//   console.log('--Buffer.from(SKA):--');
//   console.log(Buffer.from(SKA, 'hex'));
//   console.log('skA:');
//   console.log(skA);
//   console.log('Loadkey:');
//   const G = new PREClient();
//   G.loadKey(skA);
//   console.log(G.getSk());
//   console.log('G.pk:');
//   console.log(G.getPk());
//   console.log('pkA:');
//   console.log(pkA);*/
//   // test A encrypt and decrypt on his own
//   const c1 = A.enc(M, {transformable: true});
//   const [valid1, d1] = A.dec(c1);
//   console.log("A Dec [transformable]:", valid1, "Same:", d1.equals(M));
//   console.log(d1);
//   console.log('----');
//   //console.log(d1.toString());

//   // test A shares c1 to B with P, so that B can decrypt
//   // usecase: A want to share already encrypted information with B
//   //          without download, decrypt, encrypt with B's pk and send to B
//   //          by send reKey to proxy P, P will transfer the ciphertext so that B can decrypt.

//   const reKeyA2B = A.reKeyGen(pkB);
//   const [valid2, c2] = PREProxy.reEnc(c1, reKeyA2B, pkA);
//   console.log("ReEnc:", valid2);
//   const [valid3, d2] = B.dec(c2);
//   console.log("B Dec:", valid3, "Same:", d2.equals(M));
//   // C (others) cannot decrypt
//   console.log("C Dec:", C.dec(c2)[0]);

//   // sign and verify
//   const sig = A.sign(M);
//   const verified = PREClient.verify(M, sig, pkA);
//   console.log("Signature verified", verified);

//   // message that cannot be shared
//   // usecase: A want to encrypt private information with no intention of sharing
//   const c3 = A.enc(M, {transformable: false});
//   const [valid4, d3] = A.dec(c3);
//   console.log("A Dec [non-transformable]:", valid4, "Same:", d3.equals(M));
//   const [valid5, c4] = PREProxy.reEnc(c3, reKeyA2B, pkA);
//   console.log("ReEnc:", valid5); // cannot reEnc non-transformable ciphertext

// }).catch(r => {
//   console.log(r)
// });

function encryptData(publicKey, data) {
    return PRE.init(L0, L1, PRE.CURVE.SECP256K1).then(() => {
        const A = new PREClient();
        A.pk = PRE.parseSk(publicKey);
        // the message to be encrypted
        // it should be no longer than L0, usually AES key
        const M = crypto.randomBytes(L0);

        const secretKey = M.toString('hex');
        var encrypted = CryptoJS.AES.encrypt(data, secretKey);
        const c1 = A.enc(M, {transformable: true});
        return {
            key: c1.toString('hex'),
            cipher: encrypted.toString()
        }
    }).catch(r => {
        console.log(r)
    });
    
}
const pk = '0319b41b10d70dfc75c4e174ffaace0352543df6720b2a490dba0705ae000ef9c602ce870cc75e6874f0c981f6301964f02e9bfdb79a59e2a126746bb29332f64fc9';
var ip = '10.0.0.1'; 
encryptData(pk, ip).then(function (obj){
    console.log(obj);
});

function decryptData(privateKey, obj) {
    let priKey = Proxy.private_key_from_bytes(Proxy.from_hex(privateKey));
    let capsule = Proxy.capsule_from_bytes(Proxy.from_hex(obj.key));
    var symKey = Proxy.decapsulate(capsule, priKey);

    var key = CryptoJS.enc.Utf8.parse(Proxy.to_hex(symKey.to_bytes()));
    var decrypted = CryptoJS.AES.decrypt(obj.cipher, key, options);

    return decrypted.toString(CryptoJS.enc.Utf8);

}

//0319b41b10d70dfc75c4e174ffaace0352543df6720b2a490dba0705ae000ef9c602ce870cc75e6874f0c981f6301964f02e9bfdb79a59e2a126746bb29332f64fc9
//a9fcf7a44534bc8a6041f16be49a232e5199a218ada23fecb1b1c1290aeb38fff4834d275220d1c944ba902bc38577e3d99a0fd5a6718dd9773106e8bf9103a3