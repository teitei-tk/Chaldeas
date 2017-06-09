import { writeFile } from 'fs';
import Chaldeas from './../lib/chaldeas';

async function main() {
  const chaldeas = Chaldeas.new();

  try {
    const protocol = await chaldeas.fetchProtocol();

    const { Page, Network } = protocol;
    await Promise.all([
      Page.enable(),
      Network.enable(),
    ]);

    await Page.navigate({ url: 'https://github.com' });

    await Page.loadEventFired(async () => {
      const result = await Page.printToPDF();
      const fileName = (new Date()).getTime();
      const buffer = Buffer.from(result.data, 'base64');
      writeFile(`${fileName}.pdf`, buffer, (e) => {
        if (e) {
          throw e;
        }
      });

      await chaldeas.terminate();
    });
  } catch (error) {
    await chaldeas.terminate();
    console.error(error);
  }
}

main();
