import Chaldeas from './../lib/chaldeas';

async function main() {
  const chaldeas = Chaldeas.new();

  try {
    const devtools = await chaldeas.getDevtoolsInterface();

    const page = await devtools.PageDomain();
    await page.navigate({ url: 'https://github.com/teitei-tk/Chaldeas' });

    page.domContentEventFired(async () => {
      const dom = await devtools.DOMDomain();
      const rootNode = await dom.getDocument();
      const titleNode = await dom.querySelector({ nodeId: rootNode.root.nodeId, selector: 'title' });
      const node = await dom.resolveNode({ nodeId: titleNode.nodeId });
      console.log(node.object.description); // title

      await chaldeas.terminate();
    });
  } catch (error) {
    await chaldeas.terminate();
    console.error(error);
  }
}

main();
