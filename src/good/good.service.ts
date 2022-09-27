import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Vika from '@vikadata/vika';
import { pick } from 'lodash';

function getConfig(configService: ConfigService) {
  const datasheetId = configService.get<string>('VIKA_DATASHEET_ID');
  const token = configService.get<string>('VIKA_TOKEN');
  const filedGoodCode = configService.get<string>('VIKA_FIELD_GOOD_CODE');
  const filedPrice = configService.get<string>('VIKA_FIELD_RPICE');
  const filedGoodName = configService.get<string>('VIKA_FIELD_GOOD_NAME');
  return {
    datasheetId,
    token,
    filedGoodCode,
    filedPrice,
    filedGoodName,
  };
}

@Injectable()
export class GoodService {
  constructor(private configService: ConfigService) {}
  async findOne(id: string) {
    const { datasheetId, token, filedGoodCode, filedPrice, filedGoodName } =
      getConfig(this.configService);

    const vika = new Vika({ token: token, fieldKey: 'name' });
    const datasheet = vika.datasheet(datasheetId);

    const res = await datasheet.records.query({
      maxRecords: 1,
      filterByFormula: `{${filedGoodCode}}="${id}"`,
      sort: [{ field: 'updated_at', order: 'desc' }],
    });

    if (res.message) {
      if (res.data.records.length) {
        return pick(res.data.records[0].fields, [filedGoodName, filedPrice]);
      }
      return { msg: '未记录' };
    }
    // 失败
    return res;
  }

  async updateOrCreate(id: string, goodName: string, price: number) {
    const { datasheetId, token, filedGoodCode, filedPrice, filedGoodName } =
      getConfig(this.configService);

    const vika = new Vika({ token: token, fieldKey: 'name' });
    const datasheet = vika.datasheet(datasheetId);

    // TODO: 删除同 code 的数据（可能没太必要）

    const res = await datasheet.records.create([
      {
        fields: {
          [filedGoodName]: goodName,
          [filedGoodCode]: id,
          [filedPrice]: price,
        },
      },
    ]);

    if (res.success) {
      return { msg: 'success' };
    }
    return res;
  }
}
