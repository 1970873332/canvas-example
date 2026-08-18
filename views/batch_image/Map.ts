import CTXMap from "@goengine/canvas/src/map/CTX";
import HitMod from "@goengine/canvas/src/mod/Hit";
import Batch from "@goengine/canvas/src/node/advanced/Batch";
import Image, { ImageRule } from "@goengine/canvas/src/node/common/Image";
import Scroll from "@goengine/canvas/src/node/component/Scroll";
import Vector2 from "@goengine/core/src/object/math/vector/Vector2";
import { ArrayUtils } from "@goengine/core/src/util/Array";
import { GridUtils } from "@goengine/core/src/util/Grid";
import Interaction from "@goengine/web/src/control/Interaction";

const UNIT_COUNT: number = 30 ** 2,
  UNIT_WIDTH: number = 26 / 2,
  UNIT_HEIGHT: number = 37 / 2;
/**
 * 批处理地图
 */
export default class BatchMap extends CTXMap {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  /**
   * 交互
   */
  private readonly interaction = new Interaction(this.canvas);
  /**
   * 命中模块
   */
  private readonly hitMod = new HitMod(this.interaction);
  /**
   * 滚动组件
   */
  private readonly scroll = new Scroll(new HitMod(this.interaction), {
    slide: {
      mode: "inertia",
      constraint: "bound",
      direction: Vector2.one(),
      damping: Vector2.fromScalar(50),
    },
  });
  /**
   * 单元图像
   */
  private readonly unitImage = new Image({
    size: { width: UNIT_WIDTH, height: UNIT_HEIGHT },
    anchor: { x: UNIT_WIDTH / 2, y: UNIT_HEIGHT / 2 },
    source: {
      type: "img",
      src: "bunny.png",
    },
  });
  /**
   * 批处理
   */
  private readonly batch = new Batch<Image, ImageRule>({
    sample: this.unitImage,
    offset: this.unitImage.anchor.clone(),
  });

  /**
   * 初始化规则
   */
  private initRules(): void {
    const { batch } = this,
      { size, rules, sample } = batch,
      { width, height } =
        // 构建规则
        GridUtils.buildSqrt(UNIT_COUNT, sample.size, (index, position) => {
          const rule: (typeof rules)[number] = {
            position,
          };

          // 设置规则
          rules[index] = rule;
        });

    // 设置尺寸
    size.set(width, height);
  }

  protected init(): void {
    const { scene, batch, scroll } = this,
      { group } = scroll;

    // 初始化规则
    this.initRules();
    // 组适配
    group.adapt(batch);
    // 添加滚动组件
    scene.add(scroll);
  }

  protected update(time: DOMHighResTimeStamp): void {
    super.update(time);

    this.unitImage.rotation.z += 0.01;
  }

  public resize(): void {
    super.resize();

    const {
      batch,
      width,
      height,
      halfWidth,
      halfHeight,
      scroll: { size, position, group },
    } = this;

    // 设置滚动尺寸
    size.set(width, height);
    // 组适配
    group.adapt(batch);
    // 剧中滚动位置
    position.set(halfWidth - size.width / 2, halfHeight - size.height / 2);
  }

  public destroy(): void {
    super.destroy();

    this.hitMod.destroy();
    this.interaction.destroy();

    this.scroll.destroy(true);

    this.scene.clear(true);

    ArrayUtils.traverse(
      this.scene.children,
      (node) => node instanceof Image && node.clearRely(),
    );
  }
}
