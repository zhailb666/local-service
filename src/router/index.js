const Router = require('koa-router')
const router = new Router()
const config = require('../config')
const crypto = require('crypto')

router.get('/getUploadPolicy', async (ctx) => {
  const dirPath = 'testOSS/'
  const {OSSAccessKeyId, host, secret} = config.app.oss
  let end = new Date().getTime() + 300000
  let expiration = new Date(end).toISOString()
  let policyString = {
    expiration,
    conditions: [
      ['content-length-range', 0, 1048576000],
      ['starts-with', '$key', dirPath]
    ]
  }
  policyString = JSON.stringify(policyString)
  const policy = new Buffer(policyString).toString('base64')
  const signature = crypto.createHmac('sha1', secret).update(policy).digest('base64')
  ctx.OK({
    OSSAccessKeyId: OSSAccessKeyId,
    host,
    policy,
    signature,
    saveName: end,
    startsWith: dirPath
  })
})

function Workbook() {
  if(!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function sheetFromArrayOfArrays(data, opts) {
  var ws = {};
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
  for(var R = 0; R != data.length; ++R) {
    for(var C = 0; C != data[R].length; ++C) {
      if(range.s.r > R) range.s.r = R;
      if(range.s.c > C) range.s.c = C;
      if(range.e.r < R) range.e.r = R;
      if(range.e.c < C) range.e.c = C;
      var cell = {v: data[R][C] };
      if(cell.v == null) continue;
      var cell_ref = xlsx.utils.encode_cell({c:C,r:R});
      if(typeof cell.v === 'number') cell.t = 'n';
      else if(typeof cell.v === 'boolean') cell.t = 'b';
      else if(cell.v instanceof Date) {
        cell.t = 'n'; cell.z = xlsx.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if(range.s.c < 10000000) ws['!ref'] = xlsx.utils.encode_range(range);
  return ws;
};

function sheetFromArrayOfObjects(arrayOfObject) {

  var workbook = new Workbook();

  arrayOfObject.forEach( function (book) {

    /* add worksheet to workbook */
    workbook.SheetNames.push(book.sheet);

    var data  = [Object.keys(book.data[0])];
    book.data.forEach(function (value) {
      data.push(_.values(value));
    });

    workbook.Sheets[book.sheet] = sheetFromArrayOfArrays( data );

  });

  return workbook;
};

router.post('/download', async (ctx) => {
  var workbook = sheetFromArrayOfObjects([{
    sheet : 'TestSheet',
    data  : [{name : 'test'}]
  }]);


  var xlspath = __dirname  + '/tmp/tmp.xlsx';

  xlsx.writeFile(workbook, xlspath);

  var output = fs.createReadStream(xlspath);

  output.pipe(res);
})

module.exports = router
