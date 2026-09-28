import ImageKit, { toFile } from '@imagekit/nodejs';
import { config } from '../config/config.js';

const client = new ImageKit({
  privateKey: config.IMAGE_KIT_SECRET,
});

export async function uploadFile({buffer,fileName}){
    const response = await client.files.upload({
        file:await toFile(buffer),
        fileName:fileName,
        folder:"snitch"
    })
    return response
}
