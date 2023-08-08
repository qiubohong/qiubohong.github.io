class SwiperContainer extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
            .swiper-container {
                width: 300px;
                height: 300px;
                /* padding: 16px; */
                background-color: #ccc;
                border: 1px dashed #000;
                margin: 0 auto;
                position: relative;
                overflow: hidden;
            }

            .swiper-container-wrapper {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                box-sizing: content-box;
                transition: transform .3s ease-in-out;
            }

            .swiper-pagination {
                position: absolute;
                text-align: center;
                transition: .3s opacity;
                transform: translate3d(0, 0, 0);
                z-index: 10;
                bottom: 0;
                left: 0;
                width: 100%;
            }

            .swiper-pagination-bullet {
                width: 8px;
                height: 8px;
                display: inline-block;
                border-radius: 50%;
                background: #000;
                opacity: .2;
                margin-right: 4px;
            }

            .swiper-pagination-bullet-active {
                opacity: 1;
                background: #007aff;
            }

            .swiper-button-next,
            .swiper-button-prev {
                position: absolute;
                top: 50%;
                z-index: 10;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #007aff;
                font-size: 24px;
                background-color: rgba(255, 255, 255, 0.8);
                padding: 8px;
                margin-top: -12px;
            }
            .swiper-button-next-disabled,
            .swiper-button-prev-disabled {
                opacity: .35;
                cursor: not-allowed;
            }

            .swiper-button-next {
                right: 10px;
                left: auto;
            }

            .swiper-button-next::after {
                content: '>';
            }

            .swiper-button-prev {
                left: 10px;
                right: auto;
            }

            .swiper-button-prev::after {
                content: '<';
            }
        </style>
        <div class="swiper-container">
            <div class="swiper-container-wrapper">
                <slot></slot>
            </div>
            <div class="swiper-pagination">
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
        `;
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));

        this.loop = this.getAttribute('loop') === 'true';
        this.speed = this.getAttribute('speed') || 500;
        this.currentIndex = 0;
    }

    connectedCallback() {
        setTimeout(() => {
            this.wrapper = this.shadowRoot.querySelector('.swiper-container-wrapper');
            this.slides = this.querySelectorAll('swiper-slide');
            this.pagination = this.shadowRoot.querySelector('.swiper-pagination');
            this.next = this.shadowRoot.querySelector('.swiper-button-next');
            this.prev = this.shadowRoot.querySelector('.swiper-button-prev');
            this.prev.classList.add('swiper-button-prev-disabled');
            this.slideWidth = this.slides[0].offsetWidth;
            this.slideCount = this.slides.length;
            this.slides.forEach((slide) => {
                slide.style.height = '100%';
            });
            this.init();
        }, 0);
    }

    init() {
        this.wrapper.style.width = this.slideWidth * this.slideCount + 'px';
        this.wrapper.style.transform = `translate3d(-${this.slideWidth * this.currentIndex}px, 0, 0)`;
        this.wrapper.style.transition = `transform ${this.speed}ms ease-in-out`;
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });
        this.prev.addEventListener('click', () => {
            this.prevSlide();
        });
        this.pagination.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (index) {
                this.goToSlide(index);
            }
        });
        // 判断是否可以循环
        let slideCount = this.slideCount;
        if (this.slideCount > 1 && this.loop) {
            this.cloneFirstSlide();
            slideCount = this.slideCount - 1;
        }
        this.pagination.innerHTML = '';
        const bulletFragment = document.createDocumentFragment();
        for (let i = 0; i < slideCount; i++) {
            const bullet = document.createElement('div');
            bullet.classList.add('swiper-pagination-bullet');
            bullet.dataset.index = i;
            bulletFragment.appendChild(bullet);
        }
        bulletFragment.children[0].classList.add('swiper-pagination-bullet-active');
        this.pagination.appendChild(bulletFragment);
    }

    /**
     * 将第一个 slider 复制到最后
     */
    cloneFirstSlide() {
        const firstSlide = this.slides[0].cloneNode(true);
        this.wrapper.appendChild(firstSlide);
        this.slideCount++;
    }

    nextSlide() {
        if (!this.loop && this.currentIndex >= this.slideCount - 1) {
            return;
        }
        this.currentIndex++;
        if (!this.loop && this.currentIndex >= this.slideCount - 1) {
            this.next.classList.add('swiper-button-next-disabled');
        } else {
            this.next.classList.remove('swiper-button-next-disabled');
            this.prev.classList.remove('swiper-button-prev-disabled');
        }
        console.log(this.currentIndex, this.slideCount)
        // 判断是不是最后一个 如果最后一个，等动画执行完毕，瞬间跳到第一个
        if (this.currentIndex >= this.slideCount) {
            this.currentIndex = 0;
            this.wrapper.style.transition = 'none';
            this.wrapper.style.transform = `translate3d(-${this.slideWidth * this.currentIndex}px, 0, 0)`;
            setTimeout(() => {
                this.wrapper.style.transition = `transform ${this.speed}ms ease-in-out`;
                this.currentIndex++;
                this.goToSlide(this.currentIndex);
            }, 0);
        } else {
            this.goToSlide(this.currentIndex);
        }
    }

    prevSlide() {
        if (!this.loop && this.currentIndex <= 0) {
            return;
        }
        this.currentIndex--;
        if (!this.loop && this.currentIndex <= 0) {
            this.prev.classList.add('swiper-button-prev-disabled');
        } else {
            this.next.classList.remove('swiper-button-next-disabled');
            this.prev.classList.remove('swiper-button-prev-disabled');
        }
        if (this.currentIndex < 0) {
            this.currentIndex = this.slideCount - 1;
        }
        this.goToSlide(this.currentIndex);
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.wrapper.style.transform = `translate3d(-${this.slideWidth * this.currentIndex}px, 0, 0)`;
        this.setActivePagination();
    }

    setActivePagination() {
        const paginationBullets = this.shadowRoot.querySelectorAll('.swiper-pagination-bullet');
        paginationBullets.forEach((bullet, index) => {
            bullet.classList.remove('swiper-pagination-bullet-active');
        });
        if (this.currentIndex === this.slideCount - 1 && this.loop) {
            paginationBullets[0].classList.add('swiper-pagination-bullet-active');
            return;
        }
        paginationBullets.forEach((bullet, index) => {
            if (index === this.currentIndex) {
                bullet.classList.add('swiper-pagination-bullet-active');
            }
        });
    }

}

class SwiperSlide extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
        .swiper-slide {
            width: 300px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            /* 防止缩小 */
            border: 1px solid #000;
            background-color: #478703;
            color: #fff;
            font-size: 24px;
            text-align: center;
        }
        </style>
        <div class="swiper-slide"><slot></slot></div>
        `;
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}


customElements.define('swiper-container', SwiperContainer);
customElements.define('swiper-slide', SwiperSlide);
