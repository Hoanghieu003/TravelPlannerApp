export const htmlBlog = (content) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
    />
    <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet'>
    <style>
      img {
        max-width: auto !important;
        height: auto !important;
      }

      iframe {
        max-width: 100% !important;
      }

      .view-title[data-v-0403c7a5] {
        font-size: 20px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin-bottom: 20px;
      }

      .advertise-warp[data-v-0403c7a5] {
        width: calc(100% + 20px);
        margin: 0 -10px 40px;
      }

      .advertise-box[data-v-f5b20200] {
        width: 100%;
        padding: 0 10px 20px;
      }

      .default-size[data-v-5d3d5030] {
        width: 100%;
        min-width: 64px;
        border-radius: 2px;
        background-size: cover !important;
        background-repeat: no-repeat;
      }

      .hand[data-v-5d3d5030] {
        cursor: pointer;
      }

      .overflow-hidden[data-v-c0fc2998] {
        overflow: hidden;
      }

      .overflow-hidden .slick-position[data-v-c0fc2998] {
        margin-left: -10px;
        width: calc(100% + 20px);
      }

      .view-title[data-v-c0fc2998] {
        font-size: 20px;
        color: #333;
        margin-bottom: 20px;
      }

      .view-title[data-v-c0fc2998],
      .view-total[data-v-c0fc2998] {
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .view-total[data-v-c0fc2998] {
        font-size: 14px;
        color: #00afa0;
        margin-top: 20px;
      }

      .view-total[data-v-c0fc2998] :hover {
        text-decoration: underline;
      }

      .view-total .fa-angle-right[data-v-c0fc2998] {
        font-size: 19px;
        margin-left: 6px;
        vertical-align: baseline;
      }

      .blog-slick-warp[data-v-c0fc2998] {
        overflow: hidden;
        display: none;
        padding: 0 10px;
      }

      a[data-v-c0fc2998]:active,
      a[data-v-c0fc2998]:focus,
      a[data-v-c0fc2998]:hover {
        text-decoration: none;
        outline: none;
      }

      @media (min-width: 0) {
        .blog-slick-warp[data-v-c0fc2998]:first-child,
        .blog-slick-warp[data-v-c0fc2998]:nth-child(2) {
          display: block;
        }

        .notShow_3[data-v-c0fc2998] {
          display: none;
        }
      }

      @media (min-width: 992px) {
        .blog-slick-warp[data-v-c0fc2998]:nth-child(3) {
          display: block;
        }

        .notShow_4[data-v-c0fc2998] {
          display: none;
        }
      }

      @media (min-width: 1300px) {
        .blog-slick-warp[data-v-c0fc2998] {
          display: block;
        }

        .notShow_5[data-v-c0fc2998] {
          display: none;
        }
      }

      .card[data-v-07c86cde] {
        border: none;
        cursor: pointer;
      }

      .card .blog-title[data-v-07c86cde] {
        height: 27px;
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 16px;
      }

      .card .blog-title span[data-v-07c86cde] {
        vertical-align: super;
      }

      .card .blog-writer[data-v-07c86cde] {
        height: 27px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 6px;
      }

      .card .blog-date[data-v-07c86cde],
      .card .blog-writer[data-v-07c86cde] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .card .blog-date[data-v-07c86cde] {
        font-size: 12px;
        margin-top: 4px;
      }

      .default-image[data-v-f7a00cf2] {
        position: absolute;
        background-color: #f5f5f5;
        border-radius: 2px;
      }

      .blogHeight[data-v-f7a00cf2] {
        padding-bottom: 61%;
      }

      .spotHeight[data-v-f7a00cf2] {
        padding-bottom: 95%;
      }

      .image-cover[data-v-f7a00cf2] {
        background-size: cover !important;
        border-radius: 2px;
      }

      .like-button[data-v-f7a00cf2] {
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .no-list[data-v-432ebfb5] {
        width: 100%;
        height: 180px;
        background-color: #f5f5f5;
        padding-top: 56px;
      }

      .no-list .message[data-v-432ebfb5] {
        font-weight: 400;
        text-align: center;
        color: #767676;
      }

      .no-list .button[data-v-432ebfb5],
      .no-list .message[data-v-432ebfb5] {
        font-size: 16px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .no-list .button[data-v-432ebfb5] {
        margin-top: 8px;
        font-weight: 500;
        color: #fff;
      }

      .view-title .important-text {
        font-weight: 500 !important;
      }

      .overflow-hidden[data-v-7f7cbbfa] {
        overflow: hidden;
      }

      .overflow-hidden .slick-position[data-v-7f7cbbfa] {
        margin-left: -10px;
        width: calc(100% + 20px);
      }

      .view-title[data-v-7f7cbbfa] {
        padding: 0 10px;
        margin-bottom: 20px;
      }

      .view-title span[data-v-7f7cbbfa] {
        font-size: 20px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .view-title .important-text[data-v-7f7cbbfa] {
        font-weight: 500 !important;
      }

      .creatrip-logo[data-v-d4b6493a] {
        margin-top: 30px;
        text-align: center;
      }

      .local-language-box[data-v-d4b6493a] {
        margin-top: 60px;
      }

      .local-language-box .title[data-v-d4b6493a] {
        font-size: 36px;
        font-weight: 700;
        color: #00afa0;
      }

      .local-language-box .explain[data-v-d4b6493a] {
        margin-top: 30px;
        font-size: 23px;
        color: #9b9b9b;
      }

      .korean-language-box[data-v-d4b6493a] {
        margin-top: 50px;
        font-size: 23px;
        color: #9b9b9b;
      }

      .chrome-download[data-v-d4b6493a] {
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;
      }

      .chrome-download .image-box[data-v-d4b6493a] {
        max-width: 203px;
      }

      .setting-box[data-v-64bb8f25] {
        max-width: 267px;
        width: 100%;
      }

      .setting-box .title[data-v-64bb8f25] {
        margin-bottom: 30px;
        font-size: 20px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .setting-box .find-password[data-v-64bb8f25] {
        font-size: 13px;
        color: #9b9b9b;
        padding: 6px 0;
      }

      .setting-box .find-password[data-v-64bb8f25],
      .setting-box .label[data-v-64bb8f25] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .setting-box .label[data-v-64bb8f25] {
        font-size: 16px;
        color: #333;
      }

      .setting-box .input-box[data-v-64bb8f25] {
        margin-top: 10px;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .setting-box .input-box[data-v-64bb8f25]::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      .setting-box .input-box[data-v-64bb8f25]:-ms-input-placeholder,
      .setting-box .input-box[data-v-64bb8f25]::-ms-input-placeholder {
        color: #c3c3c3;
      }

      .setting-box .input-box[data-v-64bb8f25]::placeholder {
        color: #c3c3c3;
      }

      .setting-box .notice[data-v-64bb8f25] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .setting-box .line-box[data-v-64bb8f25] {
        width: 20px;
        height: 2px;
        background-color: #d8d8d8;
        margin: 38px 0;
      }

      .setting-box .confirm[data-v-64bb8f25] {
        padding: 6px 14px;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #fff;
      }

      .setting-box .error[data-v-64bb8f25] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: -0.2px;
        margin-top: 4px;
        float: right;
        color: #d0021b;
      }

      .setting-box .errorShadow[data-v-64bb8f25] {
        border: 1px solid #d0021b;
      }

      .setting-box .error-icon[data-v-64bb8f25] {
        margin: 0 0 0 10px;
      }

      .message-box[data-v-64bb8f25] {
        margin-top: 10px;
        margin-left: 10px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
      }

      .message-box .sendLinkEmail[data-v-64bb8f25] {
        padding: 0 0 6px;
      }

      .message-box .email[data-v-64bb8f25] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        letter-spacing: -0.2px;
        margin-left: 13px;
        color: #767676;
      }

      .button-box[data-v-64bb8f25] {
        margin-top: 20px;
        float: right;
      }

      .button-box button[data-v-64bb8f25] {
        padding: 6px 14px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .profile-image[data-v-e6ef0498] {
        display: inline-block;
        position: relative;
      }

      .profile-image .change-button[data-v-e6ef0498] {
        position: absolute;
        top: 25px;
        left: 25px;
      }

      .profile-image .isHomeMark[data-v-e6ef0498] {
        bottom: 0;
        right: 0;
      }

      .profile-image .overlay[data-v-e6ef0498] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.55;
      }

      .profile-image img[data-v-e6ef0498] {
        max-width: none !important;
      }

      .member-profle[data-v-aacf4d76] {
        margin: 0 0 30px;
      }

      .data div[data-v-aacf4d76] {
        margin: 2px 0;
      }

      .data .input-user-info[data-v-aacf4d76] {
        position: relative;
        max-width: 400px;
      }

      .data .input-user-info .input-group-addon[data-v-aacf4d76] {
        display: inline-block;
        position: relative;
        margin-top: 7px;
        margin-left: 10px;
      }

      .data .input-user-info .input-group-addon .addonImg[data-v-aacf4d76] {
        vertical-align: baseline;
      }

      .data .nickname[data-v-aacf4d76] {
        font-weight: 500;
        color: #333;
      }

      .data .introduce[data-v-aacf4d76],
      .data .nickname[data-v-aacf4d76] {
        margin-right: 10px;
        font-size: 16px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .data .introduce[data-v-aacf4d76] {
        font-weight: 400;
        color: #767676;
      }

      .data .defaultIntroduce[data-v-aacf4d76] {
        color: #c3c3c3;
      }

      .data img[data-v-aacf4d76] {
        vertical-align: baseline;
        vertical-align: initial;
      }

      .data .input-text[data-v-aacf4d76] {
        font-size: 13px;
        display: inline-block;
        width: 90%;
        max-width: 400px;
        padding: 0;
        padding-left: 12px;
        padding-bottom: 3px;
      }

      .data .input-text[data-v-aacf4d76]::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      .data .input-text[data-v-aacf4d76]:-ms-input-placeholder,
      .data .input-text[data-v-aacf4d76]::-ms-input-placeholder {
        color: #c3c3c3;
      }

      .data .input-text[data-v-aacf4d76]::placeholder {
        color: #c3c3c3;
      }

      .member-info[data-v-aacf4d76] {
        margin: 0 0 50px;
      }

      .member-info .icon[data-v-aacf4d76] {
        width: 18px !important;
      }

      .member-info .change-home-tag-form[data-v-aacf4d76] {
        position: relative;
        top: -2px;
        display: inline-block;
        width: 100%;
        max-width: 149px;
        margin-left: 6px;
        margin-bottom: 0;
        margin-right: 11px;
      }

      .member-info .spot-write[data-v-aacf4d76] {
        margin: 10px 0;
      }

      .member-info .spot-write-icon[data-v-aacf4d76] {
        margin: 0 3px;
      }

      .member-info .spot-count[data-v-aacf4d76] {
        margin: 0 0 0 8px;
        font-family: Raleway;
        font-weight: 500;
      }

      .member-info .homeText[data-v-aacf4d76] {
        font-weight: 500;
      }

      .member-info .rightHomeText[data-v-aacf4d76] {
        margin: 0 10px 0 8px;
      }

      .member-info .interest-list[data-v-aacf4d76] {
        margin: 0 0 0 8px;
        font-weight: 500;
      }

      .member-info img[data-v-aacf4d76] {
        vertical-align: inherit;
      }

      .member-info span[data-v-aacf4d76] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .tab-button-box[data-v-aacf4d76] {
        width: 100%;
      }

      .tab-button-box .bottom-line[data-v-aacf4d76] {
        position: relative;
        top: 1px;
        z-index: 2;
        border-bottom: 2px solid #00afa0;
      }

      .tab-button-box .tab-button[data-v-aacf4d76] {
        position: relative;
        z-index: 1;
        margin-right: 8px;
        margin-bottom: -2px;
        font-size: 16px;
        padding: 6px 14px;
        border-radius: 4px 4px 0 0;
      }

      .tab-button-box .tab-button[data-v-aacf4d76]:nth-last-child(2) {
        margin-right: 0;
      }

      .tab-button-box .btn-default[data-v-aacf4d76] {
        background-color: #c3c3c3;
        color: #fff;
      }

      .like-blog-title[data-v-aacf4d76] {
        font-size: 20px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin: 26px 8px 20px;
      }

      .profile-image[data-v-aacf4d76] {
        width: 64px;
        height: 64px;
      }

      .search-option-box[data-v-aacf4d76] {
        flex-wrap: nowrap;
        padding: 20px 0 0;
      }

      .search-option-box .type-buttons[data-v-aacf4d76] {
        padding: 0 60px 0 0;
      }

      .search-option-box .type-buttons .type-button[data-v-aacf4d76] {
        display: inline-block;
        font-weight: 400;
      }

      .search-option-box .item[data-v-aacf4d76] {
        padding: 0;
        margin-right: 15px;
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .search-option-box .item[data-v-aacf4d76]:active,
      .search-option-box .item[data-v-aacf4d76]:hover {
        text-decoration: none;
      }

      .search-option-box .active[data-v-aacf4d76] {
        color: #00afa0 !important;
        font-weight: 500 !important;
      }

      .search-option-box .order-button[data-v-aacf4d76] {
        margin: 10px 0 0;
        border-radius: 4px;
        margin-left: auto;
        flex: 0 0 auto;
        width: auto;
        max-width: none;
      }

      .search-option-box .order-button .btn[data-v-aacf4d76] {
        padding: 6px 24px;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .search-option-box .order-button .btn[data-v-aacf4d76]:active,
      .search-option-box .order-button .btn[data-v-aacf4d76]:focus {
        box-shadow: none;
      }

      .search-option-box .order-button .btn-primary[data-v-aacf4d76] {
        color: #fff;
        background-color: #767676;
        border-color: #767676;
        font-weight: 400 !important;
      }

      .search-option-box .order-button .btn-default[data-v-aacf4d76] {
        color: #767676;
        background-color: #fff;
        border-color: #767676;
        font-weight: 400 !important;
      }

      .mypage-tab-content[data-v-aacf4d76] {
        margin: 0 -10px;
      }

      @media (max-width: 992px) {
        .search-option-box[data-v-aacf4d76] {
          flex-wrap: wrap;
        }

        .search-option-box .type-buttons[data-v-aacf4d76] {
          padding: 0;
        }

        .search-option-box .order-button[data-v-aacf4d76] {
          flex: 0 0 100%;
          max-width: 100%;
          margin: 40px 0 0;
        }
      }

      @media (max-width: 576px) {
        .tab-button-box[data-v-aacf4d76] {
          width: 100%;
        }

        .tab-button-box .tab-button[data-v-aacf4d76] {
          position: relative;
          z-index: 1;
          margin-right: 8px;
          margin-bottom: -2px;
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 4px 4px 0 0;
        }
      }

      .open .dropdown-menu[data-v-71fa1a4e] {
        display: block;
        background-color: #f5f5f5;
        width: calc(100% + 4px);
        min-width: 100%;
        margin: 0 0 0 -4px;
        border-radius: 4px;
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.15);
        padding: 13px 0;
        max-height: 1000%;
        overflow-y: auto;
      }

      .open .dropdown-menu li[data-v-71fa1a4e] {
        display: list-item;
        text-align: -webkit-match-parent;
        padding: 7px 18px;
        background-color: #f5f5f5;
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .open .dropdown-menu li[data-v-71fa1a4e]:hover {
        cursor: pointer;
        background-color: #ebebeb;
        color: #000;
      }

      .open .dropdown-menu li span[data-v-71fa1a4e] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .open .dropdown-menu .active[data-v-71fa1a4e] {
        background-color: #ebebeb;
        color: #000;
      }

      .open .dropdown-menu-none[data-v-71fa1a4e] {
        width: 100%;
        padding: 0;
        margin: 8px 0 0 !important;
      }

      .open .dropdown-menu-mypage[data-v-71fa1a4e] {
        display: block;
        background-color: #fff;
        width: 100%;
        min-width: 100%;
        margin: 0;
        border-radius: 0 !important;
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.15);
        padding: 13px 0;
        max-height: 1000%;
        overflow: hidden !important;
      }

      .open .dropdown-menu-mypage li[data-v-71fa1a4e] {
        padding: 7px 12px !important;
        background-color: #fff !important;
        border-top: 1px solid #ebebeb;
      }

      .open .dropdown-menu-mypage li[data-v-71fa1a4e]:hover {
        background-color: #ebebeb !important;
        color: #000 !important;
      }

      .open .dropdown-menu-mypage li[data-v-71fa1a4e]:first-child {
        border-top: none;
      }

      .open .dropdown-menu-mypage li[data-v-71fa1a4e]:last-child {
        border-top: none;
        padding-top: 12px !important;
        background-color: #f9f9f9 !important;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        box-bottom-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.15);
      }

      .open .dropdown-menu-mypage .active[data-v-71fa1a4e] {
        background-color: #ebebeb !important;
        color: #000 !important;
      }

      .open .noMargin[data-v-71fa1a4e] {
        width: 100%;
        margin: 0 !important;
        padding: 0 !important;
      }

      .form-control[data-v-71fa1a4e]::-webkit-input-placeholder {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .form-control[data-v-71fa1a4e]:-moz-placeholder,
      .form-control[data-v-71fa1a4e]::-moz-placeholder {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .form-control[data-v-71fa1a4e]:-ms-input-placeholder {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .form-control-none[data-v-71fa1a4e] {
        padding: 0;
        padding-left: 10px;
        border: none;
        margin-bottom: 8px;
      }

      .form-control-none[data-v-71fa1a4e]::-webkit-input-placeholder {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .form-control-none[data-v-71fa1a4e]:-moz-placeholder,
      .form-control-none[data-v-71fa1a4e]::-moz-placeholder {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .form-control-none[data-v-71fa1a4e]:-ms-input-placeholder {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .form-control-underline[data-v-71fa1a4e] {
        padding: 0;
        border-radius: 0;
        border-top: none;
        border-left: none;
        border-right: none;
        padding-bottom: 3px;
        padding-left: 12px;
        font-size: 13px;
        color: #333;
      }

      .form-control-underline[data-v-71fa1a4e]::-webkit-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .form-control-underline[data-v-71fa1a4e]:-moz-placeholder,
      .form-control-underline[data-v-71fa1a4e]::-moz-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .form-control-underline[data-v-71fa1a4e]:-ms-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .input-group-addon-none[data-v-71fa1a4e] {
        position: absolute;
        height: 100%;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        margin-right: 13px;
      }

      .input-group-addon-none .addonImg[data-v-71fa1a4e] {
        vertical-align: baseline;
      }

      .addon[data-v-71fa1a4e] {
        padding-right: 35px;
      }

      .input-group-addon[data-v-71fa1a4e] {
        position: absolute;
        height: 100%;
        top: 0;
        right: 0;
        padding: 0.275rem 0.75rem 0.375rem;
      }

      .input-group-addon .addonImg[data-v-71fa1a4e] {
        vertical-align: baseline;
      }

      .check-addon[data-v-71fa1a4e] {
        top: 1px;
        right: 1px;
        height: calc(100% - 2px);
        padding: 0.175rem 0.75rem;
        background-color: #fff;
        border-radius: 0.25rem;
      }

      .check-addon .addonImg[data-v-71fa1a4e] {
        vertical-align: bottom;
      }

      .spot-title[data-v-648d0dbe] {
        font-size: 20px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin: 26px 8px 20px;
      }

      .no-data-warp[data-v-648d0dbe] {
        padding: 30px 8px;
      }

      .no-data[data-v-648d0dbe] {
        width: 100%;
        height: 360px;
        background-color: #f5f5f5;
        text-align: center;
        vertical-align: middle;
        padding-top: 128px;
      }

      .no-data span[data-v-648d0dbe] {
        color: #767676;
      }

      .no-data button[data-v-648d0dbe],
      .no-data span[data-v-648d0dbe] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .no-data button[data-v-648d0dbe] {
        margin: 20px 0 0;
        padding: 6px 14px;
        color: #fff;
      }

      .no-data .button-text[data-v-648d0dbe] {
        color: #fff;
      }

      .card[data-v-0e267ce6] {
        display: inline-block;
        border: none;
        cursor: pointer;
      }

      .card .spot-title[data-v-0e267ce6] {
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        height: 27px;
        margin-top: 16px;
      }

      .card .spot-title span[data-v-0e267ce6] {
        vertical-align: super;
      }

      .card .spot-star[data-v-0e267ce6] {
        margin-top: 2px;
        height: 20px;
      }

      .card .spot-tag[data-v-0e267ce6] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
        margin-top: 10px;
      }

      .star-rating[data-v-33fd3817] {
        line-height: normal;
      }

      .star-rating .rate[data-v-33fd3817] {
        display: inline-block;
        border: 0;
      }

      .star-rating .rate input[data-v-33fd3817] {
        display: none;
      }

      .star-rating .rate label[data-v-33fd3817] {
        float: right;
        margin: 0;
        color: #ebebeb;
      }

      .star-rating .rate label[data-v-33fd3817]:before {
        display: inline-block;
        font-size: 1rem;
        padding: 0.4rem 0.1rem;
        margin: 0;
        font-family: MaterialCommunityIcons;
        content: "\\F005";
      }

      .star-rating .rate .half[data-v-33fd3817]:before {
        content: "\\F089";
        position: absolute;
        padding-right: 0;
      }

      .star-rating .rate input:checked ~ label[data-v-33fd3817] {
        color: #00afa0;
      }

      .star-rating .isChange label[data-v-33fd3817]:before {
        cursor: pointer;
      }

      .star-rating .isChange input:checked ~ label[data-v-33fd3817]:hover,
      .star-rating .isChange label:hover ~ label[data-v-33fd3817],
      .star-rating .isChange label[data-v-33fd3817]:hover {
        color: #007a69;
      }

      .blog-title[data-v-3cafbaf4] {
        font-size: 20px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin: 26px 8px 20px;
      }

      .no-data-warp[data-v-3cafbaf4] {
        padding: 30px 8px;
      }

      .no-data[data-v-3cafbaf4] {
        width: 100%;
        height: 360px;
        background-color: #f5f5f5;
        text-align: center;
        vertical-align: middle;
        padding-top: 128px;
      }

      .no-data span[data-v-3cafbaf4] {
        color: #767676;
      }

      .no-data button[data-v-3cafbaf4],
      .no-data span[data-v-3cafbaf4] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .no-data button[data-v-3cafbaf4] {
        margin: 20px 0 0;
        padding: 6px 14px;
        color: #fff;
      }

      .no-data .button-text[data-v-3cafbaf4] {
        color: #fff;
      }

      .message-box[data-v-3b29455e] {
        padding: 10px 0 0 10px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
        min-height: 120px;
      }

      .button-box[data-v-3b29455e] {
        padding: 4px 4px 0 0;
        color: #00afa0;
        float: right;
      }

      .button-box .confirm-button[data-v-3b29455e] {
        padding: 6px 14px;
        font-size: 15px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .view-title .important-text {
        font-weight: 500 !important;
      }

      .overflow-hidden[data-v-7b25396d] {
        overflow: hidden;
      }

      .overflow-hidden .slick-position[data-v-7b25396d] {
        margin-left: -10px;
        width: calc(100% + 20px);
      }

      .view-title[data-v-7b25396d] {
        padding: 0 10px;
        margin-bottom: 20px;
      }

      .view-title span[data-v-7b25396d] {
        font-size: 20px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .view-title .important-text[data-v-7b25396d] {
        font-weight: 500 !important;
      }

      .search-option[data-v-7d578bdc] {
        margin-bottom: 40px;
      }

      .search-option .type-button[data-v-7d578bdc] {
        margin-right: 8px;
        padding: 6px 14px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #fff;
      }

      .search-option .btn-default[data-v-7d578bdc] {
        background-color: #c3c3c3;
      }

      .view-title[data-v-7d578bdc] {
        font-size: 20px;
        font-weight: 300;
        color: #333;
        padding: 0 8px;
        margin-bottom: 20px;
      }

      .view-title[data-v-7d578bdc],
      .view-total[data-v-7d578bdc] {
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .view-total[data-v-7d578bdc] {
        font-size: 14px;
        font-weight: 400;
        color: #00afa0;
        margin-top: 20px;
      }

      .view-total[data-v-7d578bdc] :hover {
        text-decoration: underline;
      }

      .advertise-box[data-v-e72ff12c] {
        width: 100%;
        padding: 0 10px 20px;
      }

      .no-list[data-v-2c759682] {
        width: 100%;
        height: 180px;
        background-color: #f5f5f5;
        padding-top: 56px;
      }

      .no-list .message[data-v-2c759682] {
        font-weight: 400;
        text-align: center;
        color: #767676;
      }

      .no-list .button[data-v-2c759682],
      .no-list .message[data-v-2c759682] {
        font-size: 16px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .no-list .button[data-v-2c759682] {
        margin-top: 8px;
        font-weight: 500;
        color: #fff;
      }

      .search-option[data-v-3d141673] {
        margin-bottom: 20px;
      }

      .search-option .type-button[data-v-3d141673] {
        margin-right: 8px;
        padding: 6px 14px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #fff;
      }

      .search-option .btn-default[data-v-3d141673] {
        background-color: #c3c3c3;
      }

      .order-option[data-v-3d141673] {
        margin-bottom: 40px;
        text-align: right;
      }

      .order-option .btn[data-v-3d141673] {
        padding: 6px 24px;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .order-option .btn[data-v-3d141673]:active,
      .order-option .btn[data-v-3d141673]:focus {
        box-shadow: none;
      }

      .order-option .btn-primary[data-v-3d141673] {
        color: #fff;
        background-color: #767676;
        border-color: #767676;
        font-weight: 400 !important;
      }

      .order-option .btn-default[data-v-3d141673] {
        color: #767676;
        background-color: #fff;
        border-color: #767676;
        font-weight: 400 !important;
      }

      .view-title[data-v-3d141673] {
        font-size: 20px;
        font-weight: 300;
        color: #333;
        padding: 0 8px;
        margin-bottom: 20px;
      }

      .view-title[data-v-3d141673],
      .view-total[data-v-3d141673] {
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .view-total[data-v-3d141673] {
        font-size: 14px;
        font-weight: 400;
        color: #00afa0;
        margin-top: 20px;
      }

      .view-total[data-v-3d141673] :hover {
        text-decoration: underline;
      }

      @media (max-width: 768px) {
        .order-option[data-v-3d141673] {
          margin-bottom: 40px;
          text-align: left;
        }
      }

      .view-title[data-v-3be31f12] {
        font-size: 20px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin-bottom: 20px;
      }

      .advertise-warp[data-v-3be31f12] {
        width: calc(100% + 20px);
        margin: 0 -10px 40px;
      }

      .advertise-box[data-v-88d725c4] {
        width: 100%;
        padding: 0 10px 20px;
      }

      .overflow-hidden[data-v-6000858a] {
        overflow: hidden;
      }

      .overflow-hidden .slick-position[data-v-6000858a] {
        margin-left: -10px;
        width: calc(100% + 20px);
      }

      .view-title[data-v-6000858a] {
        font-size: 20px;
        color: #333;
        margin-bottom: 20px;
      }

      .view-title[data-v-6000858a],
      .view-total[data-v-6000858a] {
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .view-total[data-v-6000858a] {
        font-size: 14px;
        color: #00afa0;
        margin-top: 20px;
      }

      .view-total[data-v-6000858a] :hover {
        text-decoration: underline;
      }

      .view-total .fa-angle-right[data-v-6000858a] {
        font-size: 19px;
        margin-left: 6px;
        vertical-align: baseline;
      }

      .spot-slick-warp[data-v-6000858a] {
        padding: 0 10px;
        display: none;
        overflow: hidden;
      }

      a[data-v-6000858a]:active,
      a[data-v-6000858a]:focus,
      a[data-v-6000858a]:hover {
        text-decoration: none;
        outline: none;
      }

      @media (min-width: 0) {
        .spot-slick-warp[data-v-6000858a]:first-child,
        .spot-slick-warp[data-v-6000858a]:nth-child(2) {
          display: block;
        }

        .notShow_2[data-v-6000858a] {
          display: none;
        }
      }

      @media (min-width: 768px) {
        .spot-slick-warp[data-v-6000858a]:nth-child(3) {
          display: block;
        }

        .notShow_3[data-v-6000858a] {
          display: none;
        }
      }

      @media (min-width: 992px) {
        .spot-slick-warp[data-v-6000858a]:nth-child(4) {
          display: block;
        }

        .notShow_4[data-v-6000858a] {
          display: none;
        }
      }

      @media (min-width: 1300px) {
        .spot-slick-warp[data-v-6000858a] {
          display: block;
        }

        .notShow_7[data-v-6000858a] {
          display: none;
        }
      }

      .view-title .important-text {
        font-weight: 500 !important;
      }

      .overflow-hidden[data-v-cb56b33c] {
        overflow: hidden;
      }

      .overflow-hidden .slick-position[data-v-cb56b33c] {
        margin-left: -10px;
        width: calc(100% + 20px);
      }

      .view-title[data-v-cb56b33c] {
        padding: 0 10px;
        margin-bottom: 20px;
      }

      .view-title span[data-v-cb56b33c] {
        font-size: 20px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .view-title .important-text[data-v-cb56b33c] {
        font-weight: 500 !important;
      }

      .view-title .important-text {
        font-weight: 500 !important;
      }

      .overflow-hidden[data-v-6cd05e3e] {
        overflow: hidden;
      }

      .overflow-hidden .slick-position[data-v-6cd05e3e] {
        margin-left: -10px;
        width: calc(100% + 20px);
      }

      .view-title[data-v-6cd05e3e] {
        padding: 0 10px;
        margin-bottom: 20px;
      }

      .view-title span[data-v-6cd05e3e] {
        font-size: 20px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .view-title .important-text[data-v-6cd05e3e] {
        font-weight: 500 !important;
      }

      .login-box[data-v-4148989c] {
        position: absolute;
        top: 130px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 100%;
        max-width: 610px;
        min-height: 480px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.08);
      }

      .title[data-v-4148989c] {
        padding: 45px 40px 57px;
      }

      .left-panel[data-v-4148989c] {
        padding: 0 44.5px 0 40px;
        border-right: 2px solid #f5f5f5;
      }

      .left-panel .btn.link-button[data-v-4148989c] {
        vertical-align: sub;
      }

      .right-panel[data-v-4148989c] {
        margin-top: -5px;
        padding: 0;
      }

      .right-panel .reset-password[data-v-4148989c] {
        vertical-align: top;
      }

      .right-panel > div[data-v-4148989c]:first-child {
        padding: 0 40px 0 44.5px;
      }

      .login-text[data-v-4148989c] {
        font-size: 14px;
      }

      .login-input[data-v-4148989c],
      .login-text[data-v-4148989c] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
      }

      .login-input[data-v-4148989c] {
        width: 100%;
        height: 32px;
        margin: 10px 0;
        font-family: Raleway;
        font-size: 13px;
      }

      .login-input[data-v-4148989c]::-webkit-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .login-input[data-v-4148989c]:-moz-placeholder,
      .login-input[data-v-4148989c]::-moz-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .login-input[data-v-4148989c]:-ms-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .link-button[data-v-4148989c] {
        color: #9b9b9b;
        padding: 0;
        text-align: left;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .link-button a[data-v-4148989c] {
        color: #9b9b9b;
      }

      .oauth-text-box[data-v-4148989c] {
        margin: 4px 0 0;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #9b9b9b;
      }

      .oauth-text-box .link[data-v-4148989c] {
        color: #00afa0;
        text-decoration: none;
      }

      .oauth-text-box .link[data-v-4148989c]:hover,
      .oauth-text-box .link a[data-v-4148989c]:hover {
        cursor: pointer;
        text-decoration: underline;
        color: #00afa0 !important;
      }

      .join-panel-email[data-v-4148989c] {
        margin: 10px 0 0;
      }

      .join-panel-email .checkEmail[data-v-4148989c] {
        position: absolute;
        top: 0;
        right: -21px;
      }

      .join-panel-password[data-v-4148989c] {
        margin: 10px 0;
      }

      .join-panel-password .togglePassword[data-v-4148989c] {
        position: absolute;
        top: 0;
        right: -22px;
      }

      .join-input[data-v-4148989c] {
        width: 100%;
        height: 32px;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
      }

      .join-input[data-v-4148989c]::-webkit-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .join-input[data-v-4148989c]:-moz-placeholder,
      .join-input[data-v-4148989c]::-moz-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .join-input[data-v-4148989c]:-ms-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .errorEmail[data-v-4148989c]:focus {
        border-color: red;
      }

      .footer[data-v-4148989c] {
        min-height: 120px;
        border-radius: 2px;
      }

      .footer .link-button[data-v-4148989c] {
        width: 100%;
        height: 60px;
        color: #9b9b9b;
        padding: 0;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 60px;
        letter-spacing: -0.2px;
        background-color: #f5f5f5;
        text-align: center;
      }

      .footer .link-button a[data-v-4148989c]:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      .login-button[data-v-4148989c] {
        padding: 6px 14px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #fff;
      }

      .login-fail[data-v-4148989c] {
        padding: 0 40px 0 44.5px;
      }

      .login-fail-message[data-v-4148989c] {
        margin: 5px 0;
        text-align: right;
      }

      .login-fail-message span[data-v-4148989c] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: -0.2px;
        color: #d0021b;
      }

      .login-fail-message .link[data-v-4148989c] {
        text-decoration: underline;
      }

      .login-fail-message .link[data-v-4148989c]:hover {
        cursor: pointer;
      }

      @media (max-width: 576px) {
        .login-box[data-v-4148989c] {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          min-height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          -webkit-transform: translate(0);
          transform: translate(0);
          background-color: #fff;
          padding: 0;
        }

        .title[data-v-4148989c] {
          padding: 44px 0 40px;
        }

        .left-panel[data-v-4148989c] {
          padding: 0 0 34px;
          margin: 0 78px 0 77px;
          border-right: 0;
          border-bottom: 2px solid #f5f5f5;
        }

        .right-panel[data-v-4148989c] {
          position: relative;
          padding: 34px 0 0;
        }

        .right-panel .login-fail[data-v-4148989c] {
          position: absolute;
          padding: 0 78px 0 77px;
        }

        .right-panel > div[data-v-4148989c]:first-child {
          padding: 0;
          margin: 0 78px 0 77px;
        }

        .footer[data-v-4148989c] {
          min-height: 110px;
        }
      }

      .button-google[data-v-21df0eaa] {
        background-color: #ea4335;
        border: 1px solid #ea4335;
        border-radius: 4px;
        color: #fff;
        width: 100%;
        height: 40px;
        margin: 0 0 16px;
        text-align: left;
      }

      .button-google img[data-v-21df0eaa] {
        margin: 0 15px 0 30px;
      }

      .button-google span[data-v-21df0eaa] {
        vertical-align: middle;
        margin: 9px 0;
        font-size: 15px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #fff;
      }

      .button-google[data-v-21df0eaa]:hover {
        cursor: pointer;
      }

      .button-facebook[data-v-21df0eaa] {
        background-color: #3b5998;
        border: 1px solid #3b5998;
        border-radius: 4px;
        color: #fff;
        width: 100%;
        height: 40px;
        margin: 0 0 16px;
        text-align: left;
      }

      .button-facebook img[data-v-21df0eaa] {
        margin: 0 15px 0 30px;
      }

      .button-facebook span[data-v-21df0eaa] {
        vertical-align: middle;
        margin: 9px 0;
        font-size: 15px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #fff;
      }

      .button-facebook[data-v-21df0eaa]:hover {
        cursor: pointer;
      }

      .message-box[data-v-11e7de7f] {
        margin-top: 46px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
      }

      .button-box[data-v-11e7de7f] {
        margin-bottom: 6px;
        margin-right: 14px;
        font-size: 15px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #00afa0;
        float: right;
      }

      #upload-spot-form .modal-dialog {
        max-width: 380px !important;
        width: 100% !important;
        margin: 1.75rem auto !important;
      }

      #upload-spot-form .modal-dialog .modal-body {
        position: relative;
        text-align: center;
        padding: 0 20px 24px;
      }

      #upload-spot-form .modal-dialog .modal-body .modal-head {
        position: relative;
        top: -32px;
        display: inline-block;
        padding: 5px;
      }

      #upload-spot-form .modal-dialog .modal-body .container-fluid {
        position: relative;
        top: -10px;
      }

      #upload-spot-form .modal-dialog .modal-body .container-fluid .spot-name {
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
        margin: 0;
      }

      #upload-spot-form
        .modal-dialog
        .modal-body
        .container-fluid
        .thanks-upload {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
        margin: 10px 0 24px;
      }

      #upload-spot-form .modal-dialog .modal-body .container-fluid .guidance {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.5;
        letter-spacing: -0.2px;
        text-align: center;
        color: #9b9b9b;
        margin: 0;
      }

      #upload-spot-form .modal-dialog .modal-body .container-fluid .by-email {
        margin: 0 0 30px;
      }

      #upload-spot-form .modal-dialog .modal-body .close {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #767676;
        padding: 7px 16px;
      }

      #upload-spot-form .modal-dialog .modal-body .link {
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #fff;
        padding: 6px 14px;
        border-radius: 4px;
      }

      #uploadCheckForm {
        padding: 42px 0 30px;
      }

      #uploadCheckForm .hello-user span {
        font-size: 18px;
      }

      #uploadCheckForm .guide-text,
      #uploadCheckForm .hello-user span {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
      }

      #uploadCheckForm .guide-text {
        display: inline-block;
        white-space: pre;
        font-size: 16px;
      }

      #uploadCheckForm .auto-complete {
        width: 245px;
        margin-top: 36px;
      }

      #uploadCheckForm .auto-complete input {
        height: 100%;
        border: 0;
        border-bottom: 1px solid #c3c3c3;
        border-radius: 0;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #767676;
      }

      #uploadCheckForm .auto-complete input:-moz-placeholder,
      #uploadCheckForm .auto-complete input::-moz-placeholder {
        color: #c3c3c3;
      }

      #uploadCheckForm .auto-complete input:-ms-input-placeholder {
        color: #c3c3c3;
      }

      #uploadCheckForm .auto-complete input::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      #uploadCheckForm .auto-complete input:focus {
        border-color: #7cddd4;
        box-shadow: none;
      }

      #uploadCheckForm .auto-complete ul {
        padding: 0;
      }

      #uploadCheckForm .auto-complete ul li {
        padding: 12px;
      }

      #uploadCheckForm .auto-complete ul li div {
        padding: 1px 0;
      }

      #uploadCheckForm .auto-complete ul .active,
      #uploadCheckForm .auto-complete ul li:hover {
        background-color: #ebebeb;
      }

      #uploadCheckForm .nextButton {
        margin: 0 0 0 1px;
        padding: 6px 14px;
        border-radius: 4px;
        margin-top: 26px;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #fff;
      }

      @media (max-width: 768px) {
        #uploadCheckForm {
          padding: 0 23px 30px;
        }
      }

      .userInfo-warp .userInfoWarp[data-v-f344117e] {
        max-width: calc(100% - 30px);
        padding-left: 10px;
      }

      .userInfo-warp .userInfoWarp .userInfoText[data-v-f344117e] {
        height: 27px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .userInfo-warp .userInfoWarp .userInfoText span[data-v-f344117e] {
        vertical-align: super;
      }

      .userInfo-warp .userInfoWarp .userIntroduce[data-v-f344117e] {
        max-width: 100%;
        height: 27px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .userInfo-warp .userInfoWarp .userIntroduce span[data-v-f344117e] {
        font-size: 16px;
        color: #767676;
        vertical-align: super;
      }

      .form-control[data-v-7166fa26] {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333 !important;
      }

      .form-control[data-v-7166fa26]::-webkit-input-placeholder {
        color: #c3c3c3 !important;
      }

      .form-control[data-v-7166fa26]:-ms-input-placeholder,
      .form-control[data-v-7166fa26]::-ms-input-placeholder {
        color: #c3c3c3 !important;
      }

      .form-control[data-v-7166fa26]::placeholder {
        color: #c3c3c3 !important;
      }

      .open .dropdown-menu[data-v-7166fa26] {
        min-width: 100%;
        display: block;
        padding: 0;
        border-radius: 2px;
        z-index: 1;
      }

      .open .dropdown-menu li[data-v-7166fa26] {
        display: list-item;
        text-align: -webkit-match-parent;
        padding: 3px 20px;
        background-color: #fff;
        color: #000;
        border-bottom: 1px solid #ebebeb;
      }

      .open .dropdown-menu li[data-v-7166fa26]:last-child {
        border-bottom: none;
      }

      .open .dropdown-menu li[data-v-7166fa26]:hover {
        cursor: pointer;
        background-color: #d0d0d0;
        color: #000;
      }

      .open .dropdown-menu li .first-text[data-v-7166fa26] {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #767676;
      }

      .open .dropdown-menu .add-item li .plus-text[data-v-7166fa26],
      .open .dropdown-menu li .add-item .plus-text[data-v-7166fa26],
      .open .dropdown-menu li .second-text[data-v-7166fa26] {
        margin: 0 2px 0 0;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #9b9b9b;
      }

      .open
        .dropdown-menu
        .add-item
        li
        .plus-text
        .second_value[data-v-7166fa26],
      .open
        .dropdown-menu
        li
        .add-item
        .plus-text
        .second_value[data-v-7166fa26],
      .open .dropdown-menu li .second-text .second_value[data-v-7166fa26] {
        margin: 0 0 0 10px;
      }

      .open
        .dropdown-menu
        .add-item
        li
        .plus-text
        .second_value[data-v-7166fa26]:first-child,
      .open
        .dropdown-menu
        li
        .add-item
        .plus-text
        .second_value[data-v-7166fa26]:first-child,
      .open
        .dropdown-menu
        li
        .second-text
        .second_value[data-v-7166fa26]:first-child {
        margin: 0;
      }

      .open .dropdown-menu li .mt-2px[data-v-7166fa26] {
        margin: 2px 0 0;
      }

      .open .dropdown-menu li[data-v-7166fa26]:nth-last-child(2) {
        border-bottom: 0;
      }

      .open .dropdown-menu .selection[data-v-7166fa26] {
        max-width: 100%;
        word-break: break-word;
      }

      .open .dropdown-menu .selection span[data-v-7166fa26] {
        vertical-align: middle;
      }

      .open .dropdown-menu .add-item[data-v-7166fa26] {
        background-color: #f9f9f9;
      }

      .open .dropdown-menu .add-item .plus-text[data-v-7166fa26] {
        font-size: 18px;
        color: #9b9b9b;
        margin: 0 12px 0 0;
      }

      .open .dropdown-menu .active[data-v-7166fa26] {
        background-color: #d0d0d0;
        color: #000;
      }

      #UploadPhotoAndReview[data-v-787e1663] {
        max-width: 820px;
      }

      #UploadPhotoAndReview .spot-name-warp[data-v-787e1663] {
        margin: 0 0 10px !important;
      }

      #UploadPhotoAndReview .spot-name[data-v-787e1663] {
        padding: 6px 10px;
        border-radius: 2px;
        background-color: #f5f5f5;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
      }

      #UploadPhotoAndReview .announce[data-v-787e1663] {
        margin: 0 0 30px !important;
      }

      #UploadPhotoAndReview .announce-text[data-v-787e1663] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
      }

      #UploadPhotoAndReview .dot-text-warp[data-v-787e1663] {
        margin: 0 0 40px !important;
      }

      #UploadPhotoAndReview .dot-text-warp .dot-text[data-v-787e1663] {
        margin: 0 18px 0 0 !important;
      }

      #UploadPhotoAndReview .input-review[data-v-787e1663] {
        margin: 0 0 36px !important;
      }

      #UploadPhotoAndReview .uploadBtn[data-v-787e1663] {
        padding: 6px 14px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #fff;
      }

      @media (max-width: 768px) {
        .respon-padding[data-v-787e1663] {
          padding: 0 30px;
        }
      }

      @media (max-width: 768px) {
        #UploadPhotoAndReview[data-v-787e1663] {
          padding: 0 23px 30px;
        }

        .respon-padding[data-v-787e1663] {
          padding: 0;
        }
      }

      .text[data-v-fb4581e2] {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #9b9b9b;
      }

      .upload-Photo[data-v-861abaf0] {
        padding: 16px;
        min-height: 240px;
        border-radius: 4px;
        background-color: #e2efee;
      }

      .warp[data-v-861abaf0] {
        min-height: 208px;
        border-radius: 4px;
        border: 3px dotted #2daca0;
      }

      .imageHolder[data-v-861abaf0] {
        top: 0;
        left: 0;
        padding: 40px 0 46px;
      }

      .center-text[data-v-861abaf0] {
        padding: 10px 0;
      }

      .img-upload-text[data-v-861abaf0] {
        font-size: 16px;
        color: #767676;
      }

      .img-upload-text[data-v-861abaf0],
      .uploadBtn[data-v-861abaf0] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .uploadBtn[data-v-861abaf0] {
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
        padding: 6px 14px;
      }

      #review-input[data-v-61e8202e] {
        border-radius: 4px;
        background-color: #f5f5f5;
        padding: 24px 24px 20px;
      }

      #review-input .reivew-text-area[data-v-61e8202e] {
        padding: 6px 0 0;
        background-color: #f5f5f5;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.75;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
        max-height: 200px;
      }

      #review-input .reivew-text-area[data-v-61e8202e]:focus {
        border: 0;
        box-shadow: none;
      }

      #review-input
        .reivew-text-area[data-v-61e8202e]::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      #review-input .reivew-text-area[data-v-61e8202e]:-ms-input-placeholder,
      #review-input .reivew-text-area[data-v-61e8202e]::-ms-input-placeholder {
        color: #c3c3c3;
      }

      #review-input .reivew-text-area[data-v-61e8202e]::placeholder {
        color: #c3c3c3;
      }

      #review-input .isLocalText[data-v-61e8202e] {
        font-size: 0.8rem;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 2.15;
        letter-spacing: -0.2px;
        color: #00afa0;
      }

      #review-input .border-secondary[data-v-61e8202e] {
        border-color: #c3c3c3 !important;
        color: #c3c3c3 !important;
      }

      #upload-spot[data-v-fb01feaa] {
        max-width: 820px;
      }

      #upload-spot .mb-12[data-v-fb01feaa] {
        margin-bottom: 12px !important;
      }

      #upload-spot .mb-16[data-v-fb01feaa] {
        margin-bottom: 16px !important;
      }

      #upload-spot .mb-20[data-v-fb01feaa] {
        margin-bottom: 20px !important;
      }

      #upload-spot .dot-texts[data-v-fb01feaa] {
        margin: 0 0 40px !important;
      }

      #upload-spot .dot-texts .dot-text[data-v-fb01feaa] {
        margin: 0 18px 0 0;
      }

      #upload-spot .input-form[data-v-fb01feaa] {
        color: #333 !important;
      }

      #upload-spot .input-form[data-v-fb01feaa]::-webkit-input-placeholder {
        color: #c3c3c3 !important;
      }

      #upload-spot .input-form[data-v-fb01feaa]:-ms-input-placeholder,
      #upload-spot .input-form[data-v-fb01feaa]::-ms-input-placeholder {
        color: #c3c3c3 !important;
      }

      #upload-spot .input-form[data-v-fb01feaa]::placeholder {
        color: #c3c3c3 !important;
      }

      #upload-spot button[data-v-fb01feaa]:active,
      #upload-spot button[data-v-fb01feaa]:focus {
        border: 0 !important;
        box-shadow: none !important;
        outline: none !important;
      }

      #upload-spot .gradient[data-v-fb01feaa] {
        background: linear-gradient(
          180deg,
          #fff,
          #f8f8f8 35%,
          #f7f7f7 36%,
          #f2f2f2 50%,
          #efefef 56%,
          #e0e0e0
        );
      }

      #upload-spot .label-text[data-v-fb01feaa] {
        text-align: left;
        color: #333;
      }

      #upload-spot .label-text[data-v-fb01feaa],
      #upload-spot .title[data-v-fb01feaa] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      #upload-spot .title[data-v-fb01feaa] {
        margin-bottom: 30px;
      }

      #upload-spot .upload-photo[data-v-fb01feaa] {
        margin: 0 0 16px;
        background-color: #e2efee;
      }

      #upload-spot .announce-text[data-v-fb01feaa] {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      #upload-spot .google-map[data-v-fb01feaa] {
        height: 248px;
      }

      #upload-spot .city-text[data-v-fb01feaa] {
        font-size: 14px;
      }

      #upload-spot .text-danger[data-v-fb01feaa] {
        color: #c3c3c3 !important;
      }

      #upload-spot .error-text[data-v-fb01feaa] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: -0.2px;
        text-align: left;
        color: #d0021b;
        margin: 2px 0;
      }

      #upload-spot .error-text[data-v-fb01feaa]:first-child {
        margin: 10px 0 2px;
      }

      .input-warp[data-v-fb01feaa] {
        height: 32px;
      }

      .input-warp .localCityName[data-v-fb01feaa] {
        position: absolute;
        top: 2px;
        right: 14px;
      }

      .input-warp .localCityName span[data-v-fb01feaa] {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #9b9b9b;
      }

      .input-warp .isLocalCheck[data-v-fb01feaa] {
        margin: 0 0 0 4px;
      }

      .reviewForm[data-v-fb01feaa] {
        margin: 52px 0 48px !important;
      }

      .collText[data-v-fb01feaa] {
        margin: 0 0 2px;
      }

      .collButton[data-v-fb01feaa] {
        margin: 0 0 56px;
      }

      .add-time[data-v-fb01feaa]:nth-last-child(2) {
        margin-bottom: 8px !important;
      }

      @media (max-width: 768px) {
        #upload-spot[data-v-fb01feaa] {
          padding: 0 23px 30px;
        }
      }

      .text[data-v-202ab694] {
        font-size: 1.1rem;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
      }

      .necessary[data-v-202ab694] {
        vertical-align: sub;
      }

      #map {
        height: 100%;
        width: 100%;
      }

      #pac-input {
        width: 50%;
        min-width: 200px;
        height: 32px;
        border-radius: 4px;
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
        margin: 10px;
        margin-left: 12px;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #767676;
        font-family: MaterialCommunityIcons;
      }

      #pac-input::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      #pac-input:-ms-input-placeholder,
      #pac-input::-ms-input-placeholder {
        color: #c3c3c3;
      }

      #pac-input::placeholder {
        color: #c3c3c3;
      }

      #time-checkBox {
        margin-bottom: 12px;
      }

      #time-checkBox .del {
        outline: none;
      }

      #time-checkBox .del:active,
      #time-checkBox .del:focus {
        border: 0 !important;
        box-shadow: none !important;
        outline: none !important;
      }

      #time-checkBox .gradient {
        height: 32px;
        border-radius: 4px;
        background: linear-gradient(
          180deg,
          #fff,
          #f8f8f8 35%,
          #f7f7f7 36%,
          #f2f2f2 50%,
          #efefef 56%,
          #e0e0e0
        );
        border: 1px solid #c3c3c3;
        font-size: 13px;
        line-height: normal;
        color: #767676;
      }

      #time-checkBox .fullTimeCheckBox,
      #time-checkBox .gradient {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: -0.2px;
      }

      #time-checkBox .fullTimeCheckBox {
        font-size: 14px;
        line-height: 1.86;
      }

      #time-checkBox .checkBox input:disabled ~ label {
        color: #f3f3f3 !important;
      }

      .del[data-v-755fd2bf] {
        outline: none;
      }

      .del[data-v-755fd2bf]:active,
      .del[data-v-755fd2bf]:focus {
        border: 0 !important;
        box-shadow: none !important;
        outline: none !important;
      }

      .border-danger[data-v-755fd2bf]:focus {
        box-shadow: 0 0 0 0.2rem hsla(1, 84%, 69%, 0.25);
      }

      .input-form[data-v-755fd2bf] {
        color: #333 !important;
      }

      .input-form[data-v-755fd2bf]::-webkit-input-placeholder {
        color: #c3c3c3 !important;
      }

      .input-form[data-v-755fd2bf]:-ms-input-placeholder,
      .input-form[data-v-755fd2bf]::-ms-input-placeholder {
        color: #c3c3c3 !important;
      }

      .input-form[data-v-755fd2bf]::placeholder {
        color: #c3c3c3 !important;
      }

      .error-msg[data-v-755fd2bf] {
        font-size: 12px;
        color: #d0021b !important;
      }

      .regist-box[data-v-6f1dc9ca] {
        position: absolute;
        width: 610px;
        min-height: 300px;
        left: 50%;
        margin-top: 150px;
        margin-left: -305px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.08);
      }

      .regist-box .title[data-v-6f1dc9ca] {
        font-size: 20px;
        line-height: normal;
        margin-top: 59px;
        color: #333;
      }

      .regist-box .sub-title[data-v-6f1dc9ca],
      .regist-box .title[data-v-6f1dc9ca] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: -0.2px;
        text-align: center;
      }

      .regist-box .sub-title[data-v-6f1dc9ca] {
        font-size: 14px;
        line-height: 1.36;
        margin-top: 10px;
        color: #767676;
      }

      .regist-box .sub-title p[data-v-6f1dc9ca] {
        margin-bottom: 0;
      }

      .regist-box .sub-title .detail[data-v-6f1dc9ca] {
        margin-top: 5px;
        margin-bottom: 20px;
      }

      .regist-box .input-box[data-v-6f1dc9ca] {
        text-align: left;
        margin-left: 193px;
      }

      .regist-box .input-box .email-input[data-v-6f1dc9ca] {
        display: inline-block;
        margin-top: 34px;
      }

      .regist-box .input-box .email-input[data-v-6f1dc9ca],
      .regist-box .input-box .login-email-input[data-v-6f1dc9ca] {
        width: 220px;
        height: 32px;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #c3c3c3;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .regist-box .input-box .login-email-input[data-v-6f1dc9ca] {
        margin-top: 26px;
      }

      .regist-box .input-box .login-pw-input[data-v-6f1dc9ca] {
        margin-top: 10px;
        width: 220px;
        height: 32px;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #c3c3c3;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .regist-box .input-box .icon[data-v-6f1dc9ca] {
        display: inline-block;
        padding-top: 10px;
        padding-left: 8px;
      }

      .regist-box .input-box .button[data-v-6f1dc9ca],
      .regist-box .input-box .login-button[data-v-6f1dc9ca] {
        width: 220px;
        margin-top: 10px;
      }

      @media (max-width: 576px) {
        .regist-box[data-v-6f1dc9ca] {
          position: absolute;
          padding: 0 18px;
          width: 100%;
          margin-left: 0;
          max-width: 610px;
          min-height: 480px;
          top: 0;
          left: 0;
          -webkit-transform: translateX(0);
          transform: translateX(0);
          border-radius: 0;
          background-color: #fff;
          box-shadow: none;
        }

        .regist-box .input-box[data-v-6f1dc9ca] {
          text-align: center;
          margin-left: 0;
        }

        .regist-box .input-box .button[data-v-6f1dc9ca] {
          margin-left: -23px;
        }

        .regist-box .input-box .login-email-input[data-v-6f1dc9ca],
        .regist-box .input-box .login-pw-input[data-v-6f1dc9ca] {
          margin: 0 auto;
          margin-top: 10px;
        }
      }

      .regist-box[data-v-7a9fd152] {
        position: absolute;
        width: 100%;
        max-width: 610px;
        top: 130px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.08);
      }

      .progress-button[data-v-7a9fd152] {
        margin-top: 45px;
        height: 46px;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
      }

      .attention-subject[data-v-7a9fd152] {
        margin-top: 50px;
      }

      .attention-subject p[data-v-7a9fd152] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
        margin-bottom: 2px;
      }

      .subject-list[data-v-7a9fd152] {
        margin: 20px 110px;
        text-align: center;
      }

      .subject-list button[data-v-7a9fd152] {
        padding: 6px 14px !important;
        margin: 4px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #fff;
        background-color: #c3c3c3;
        border-radius: 4px;
      }

      .subject-list .subject-select[data-v-7a9fd152] {
        background-color: #fdca04;
      }

      .subject-list .selected[data-v-7a9fd152] {
        color: #fff;
      }

      .request-box[data-v-7a9fd152] {
        margin-top: 50px;
        text-align: center;
      }

      .request-box span[data-v-7a9fd152] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
      }

      .request-box .request-form[data-v-7a9fd152] {
        width: 300px;
        margin: 10px auto 0;
      }

      .request-box .request-form .request-form-input[data-v-7a9fd152] {
        width: 160px;
        height: 32px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
        border-radius: 4px;
        background-color: #fff;
        display: inline-block;
        margin-right: 5px;
      }

      .request-box
        .request-form
        .request-form-input[data-v-7a9fd152]::-webkit-input-placeholder {
        color: #9b9b9b;
      }

      .request-box
        .request-form
        .request-form-input[data-v-7a9fd152]:-ms-input-placeholder,
      .request-box
        .request-form
        .request-form-input[data-v-7a9fd152]::-ms-input-placeholder {
        color: #9b9b9b;
      }

      .request-box
        .request-form
        .request-form-input[data-v-7a9fd152]::placeholder {
        color: #9b9b9b;
      }

      .request-box .request-form .request-form-button[data-v-7a9fd152] {
        height: 32px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #767676;
      }

      .select-box[data-v-7a9fd152] {
        margin-top: 50px;
        text-align: center;
      }

      .select-box .select-box-title[data-v-7a9fd152] {
        font-size: 14px;
        color: #333;
        margin: 0 0 2px;
      }

      .select-box .select-box-notice[data-v-7a9fd152],
      .select-box .select-box-title[data-v-7a9fd152] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
      }

      .select-box .select-box-notice[data-v-7a9fd152] {
        font-size: 12px;
        color: #9b9b9b;
      }

      .footer[data-v-7a9fd152] {
        bottom: 0;
        width: 100%;
        border-radius: 2px;
        text-align: right;
        margin: 50px 0 20px;
      }

      .footer span[data-v-7a9fd152] {
        font-size: 12px;
        text-align: left;
        color: #d0021b;
      }

      .footer .next-button[data-v-7a9fd152],
      .footer span[data-v-7a9fd152] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .footer .next-button[data-v-7a9fd152] {
        width: 70px;
        height: 32px;
        margin: 0 24px 0 10px;
        font-size: 13px;
      }

      @media (max-width: 576px) {
        .regist-box[data-v-7a9fd152] {
          position: absolute;
          padding: 0 18px;
          width: 100%;
          max-width: 610px;
          min-height: 480px;
          top: 0;
          left: 0;
          -webkit-transform: translateX(0);
          transform: translateX(0);
          border-radius: 0;
          background-color: #fff;
          box-shadow: none;
        }

        .regist-box .subject-list[data-v-7a9fd152] {
          margin: 20px 0;
        }

        .regist-box .next-button[data-v-7a9fd152] {
          margin: 0 6px 0 10px;
        }
      }

      .nav-sign-up .item[data-v-70c47cba],
      .nav-sign-up[data-v-70c47cba] {
        font-family: Raleway;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .nav-sign-up .item[data-v-70c47cba] {
        text-align: center;
        color: #c3c3c3;
      }

      .nav-sign-up .line[data-v-70c47cba] {
        vertical-align: text-top !important;
      }

      .nav-sign-up .active[data-v-70c47cba] {
        font-weight: 500;
        color: #00afa0;
      }

      #reserveList .reserveList {
        max-width: 820px;
      }

      #reserveList .reserveList .title {
        padding-bottom: 30px;
      }

      #reserveList .reserveList .title span {
        font-size: 20px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      #reserveList .no-reserve-list {
        min-height: 182px;
        background-color: #f5f5f5;
        text-align: center;
        padding: 57px 0;
      }

      #reserveList .no-reserve-list p {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #767676;
        margin-bottom: 8px;
      }

      .reserve-card {
        padding: 41px 10px;
      }

      .reserve-card .reserve-image .image {
        width: 190px;
        height: 100px;
      }

      .reserve-card .reserve-info {
        min-width: 190px;
        padding: 0 30px;
      }

      .reserve-card .reserve-info .spot-name {
        margin-bottom: 13px;
        font-size: 18px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #00afa0;
      }

      .reserve-card .reserve-info .info-name {
        color: #9b9b9b;
      }

      .reserve-card .reserve-info .info,
      .reserve-card .reserve-info .info-name {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .reserve-card .reserve-info .info {
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .reserve-card .reserve-status .status {
        width: 100px;
        height: 100px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 100px;
        letter-spacing: -0.2px;
      }

      .reserve-card .reserve-status .waiting {
        border: 1px solid #9b9b9b;
        color: #9b9b9b;
      }

      .reserve-card .reserve-status .complete {
        border: 1px solid #00afa0;
        color: #00afa0;
      }

      .reserve-card .reserve-status .cancle {
        border: 1px solid #c3c3c3;
        color: #c3c3c3;
      }

      #reserve-cancle-modal .modal-body {
        padding: 0;
      }

      #reserve-cancle-modal .modal-body .reserve-cancle-body {
        border-radius: 2px;
        background-color: #fff;
        padding: 40px 24px 24px;
      }

      #reserve-cancle-modal
        .modal-body
        .reserve-cancle-body
        .reserve-cancle-content {
        text-align: center;
      }

      #reserve-cancle-modal
        .modal-body
        .reserve-cancle-body
        .reserve-cancle-content
        .main {
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
        margin-bottom: 2px;
      }

      #reserve-cancle-modal
        .modal-body
        .reserve-cancle-body
        .reserve-cancle-content
        .no_pay {
        margin: 10px 0 52px;
      }

      #reserve-cancle-modal
        .modal-body
        .reserve-cancle-body
        .reserve-cancle-content
        .second {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.29;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
        margin-bottom: 10px;
      }

      #reserve-cancle-modal
        .modal-body
        .reserve-cancle-body
        .reserve-cancle-content
        .third {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.5;
        letter-spacing: -0.2px;
        text-align: center;
        color: #9b9b9b;
        margin-bottom: 28px;
      }

      #reserve-cancle-modal .modal-body .link-button {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: right;
        color: #767676;
        margin-right: 24px;
      }

      #reserve-cancle-modal .modal-body .close-button {
        padding: 6px 14px;
        border-radius: 4px;
        background-color: #00afa0;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #fff;
      }

      @media (max-width: 898px) {
        .reserve-card .reserve-status {
          margin-top: 20px;
          width: 100%;
        }

        .reserve-card .reserve-status .status {
          width: 100%;
          height: 52px;
          line-height: 52px;
        }
      }

      @media (max-width: 576px) {
        .reserve-card .reserve-image {
          width: 100%;
          padding-left: 0;
          padding-right: 0;
        }

        .reserve-card .reserve-image .image {
          width: 100%;
          padding-bottom: 56.047%;
        }

        .reserve-card .reserve-info {
          padding: 20px 0;
        }

        .reserve-card .reserve-status {
          width: 100%;
          padding-left: 0;
          padding-right: 0;
        }

        .reserve-card .reserve-status .status {
          width: 100%;
          height: 52px;
          line-height: 52px;
        }
      }

      #reserve-detail .modal-dialog {
        max-width: 375px !important;
      }

      #reserve-detail .reserve-detail-header {
        width: 100%;
        height: 80px;
        background-color: #00afa0;
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 80px;
        letter-spacing: -0.2px;
        text-align: center;
        color: #fff;
      }

      #reserve-detail .modal-content {
        border: 0;
      }

      #reserve-detail .modal-body {
        padding: 0 !important;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.75);
      }

      #reserve-detail .reserve-detail-body .reserve-detail-content {
        padding: 30px;
        max-height: 495px;
        overflow-y: auto;
      }

      #reserve-detail
        .reserve-detail-body
        .reserve-detail-content
        .need-payment {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #00afa0;
        margin-bottom: 8px;
      }

      #reserve-detail
        .reserve-detail-body
        .reserve-detail-content
        .reserve-detail-info {
        margin-bottom: 24px;
      }

      #reserve-detail
        .reserve-detail-body
        .reserve-detail-content
        .reserve-detail-info
        label {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin-bottom: 5px;
      }

      #reserve-detail
        .reserve-detail-body
        .reserve-detail-content
        .reserve-detail-info
        p {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      #reserve-detail .reserve-detail-body .reserve-detail-footer {
        width: 100%;
        height: 92px;
        background-color: #fff;
        padding: 30px;
      }

      #reserve-detail .reserve-item {
        margin-bottom: 10px;
      }

      #reserve-detail .price-info {
        padding: 20px;
        border-radius: 4px;
        background-color: #f5f5f5;
      }

      #reserve-detail .price-info .d-price {
        font-size: 18px;
        font-weight: 500;
        color: #333;
        margin-right: 10px;
      }

      #reserve-detail .price-info .d-price,
      #reserve-detail .price-info .o-price {
        font-family: Raleway;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      #reserve-detail .price-info .o-price {
        font-size: 15px;
        font-weight: 400;
        color: #c3c3c3;
        text-decoration: line-through;
      }

      #reserve-detail .cancle-button {
        font-size: 13px;
        font-weight: 400;
        text-align: right;
        color: #767676;
        margin-right: 30px;
      }

      #reserve-detail .cancle-button,
      #reserve-detail .link-button {
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      #reserve-detail .link-button {
        padding: 6px 14px;
        border-radius: 4px;
        background-color: #00afa0;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
      }

      #reserve-detail .cancle-show {
        position: absolute;
        top: 240px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        border-radius: 10px;
        border: 3px solid #00afa0;
        background-color: #fff;
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        padding: 14px 48px;
        text-align: center;
      }

      #reserve-detail .cancle-back {
        position: absolute;
        top: 80px;
        width: 100%;
        height: calc(100% - 80px);
        background-color: #fff;
        opacity: 0.7;
      }

      #reserve-detail .cancle-close {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 17px;
        height: 17px;
      }

      #reserve-detail .cancle-close svg {
        vertical-align: baseline;
        vertical-align: initial;
      }

      #reserve-detail .blur {
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius="3");
        -webkit-filter: url(#blur-filter);
        filter: url(#blur-filter);
        -webkit-filter: blur(3px);
        filter: blur(3px);
      }

      #reserve-detail .blur-svg {
        display: none;
      }

      #component-reserve-product {
        padding: 20px;
        border-radius: 4px;
        background-color: #f5f5f5;
      }

      #component-reserve-product .product-name {
        margin-bottom: 10px;
      }

      #component-reserve-product .d-price,
      #component-reserve-product .product-name {
        font-size: 15px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      #component-reserve-product .d-price {
        font-family: Raleway;
        margin-right: 6px;
      }

      #component-reserve-product .o-price {
        font-family: Raleway;
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
        text-decoration: line-through;
      }

      #component-reserve-product .count,
      #component-reserve-product .read-only-count {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #333;
      }

      #component-reserve-product .count {
        font-family: Raleway;
        padding: 0 10px;
      }

      #component-reserve-product .count-button {
        width: 23px;
        height: 23px;
        border-radius: 4px;
        padding: 0;
        background-color: #fff;
        border: 1px solid #00afa0;
      }

      #component-reserve-product .count-button span {
        font-size: 15px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #00afa0;
        vertical-align: super;
      }

      .regist-box[data-v-2622196f] {
        position: absolute;
        width: 100%;
        max-width: 610px;
        min-height: 480px;
        top: 130px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.08);
      }

      .progress-button[data-v-2622196f] {
        margin-top: 45px;
        height: 46px;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
      }

      .attention-city[data-v-2622196f] {
        margin-top: 50px;
      }

      .attention-city p[data-v-2622196f] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
        margin-bottom: 2px;
      }

      .city-list[data-v-2622196f] {
        margin: 20px 110px;
        text-align: center;
      }

      .city-list button[data-v-2622196f] {
        padding: 6px 14px !important;
        margin: 4px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #fff;
        background-color: #c3c3c3;
        border-radius: 4px;
      }

      .city-list .city-select[data-v-2622196f] {
        background-color: #fdca04;
      }

      .city-list .selected[data-v-2622196f] {
        color: #fff;
      }

      .search-box[data-v-2622196f] {
        text-align: center;
      }

      .search-box .search-form[data-v-2622196f] {
        text-align: center;
        width: 270px;
        margin: 10px auto 0;
        border-radius: 4px;
      }

      .search-box .search-form .search-form-input[data-v-2622196f] {
        width: 100%;
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #9b9b9b;
        border: none;
      }

      .select-box[data-v-2622196f] {
        margin: 50px 0 0;
        text-align: center;
      }

      .select-box .select-box-title[data-v-2622196f] {
        font-size: 14px;
        color: #333;
        margin-bottom: 2px;
      }

      .select-box .select-box-notice[data-v-2622196f],
      .select-box .select-box-title[data-v-2622196f] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
      }

      .select-box .select-box-notice[data-v-2622196f] {
        font-size: 12px;
        color: #9b9b9b;
      }

      .add-city-box[data-v-2622196f] {
        text-align: center;
        margin: 50px 0 0;
      }

      .add-city-box span[data-v-2622196f] {
        text-align: center;
        color: #333;
      }

      .add-city-box .add-city-button[data-v-2622196f],
      .add-city-box span[data-v-2622196f] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .add-city-box .add-city-button[data-v-2622196f] {
        margin: 10px 0 0;
        padding: 6px 14px;
        color: #767676;
        background-color: #fff;
        border-radius: 4px;
        border: 1.5px solid #00afa0;
      }

      .footer[data-v-2622196f] {
        bottom: 0;
        width: 100%;
        border-radius: 2px;
        text-align: right;
        margin: 50px 0 20px;
      }

      .footer span[data-v-2622196f] {
        font-size: 12px;
        text-align: left;
        color: #d0021b;
      }

      .footer .next-button[data-v-2622196f],
      .footer span[data-v-2622196f] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .footer .next-button[data-v-2622196f] {
        width: 70px;
        height: 32px;
        margin-left: 10px;
        margin-right: 24px;
        font-size: 13px;
      }

      @media (max-width: 576px) {
        .regist-box[data-v-2622196f] {
          position: absolute;
          padding: 0 18px;
          width: 100%;
          max-width: 610px;
          min-height: 480px;
          top: 0;
          left: 0;
          -webkit-transform: translateX(0);
          transform: translateX(0);
          border-radius: 0;
          background-color: #fff;
          box-shadow: none;
        }

        .regist-box .city-list[data-v-2622196f] {
          margin: 20px 0;
        }

        .regist-box .next-button[data-v-2622196f] {
          margin-right: 6px;
        }
      }

      .regist-box[data-v-0476bf38] {
        position: absolute;
        width: 100%;
        max-width: 610px;
        top: 130px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.08);
      }

      .progress-button[data-v-0476bf38] {
        margin-top: 45px;
        height: 46px;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
      }

      .attention-member[data-v-0476bf38] {
        margin-top: 60px;
      }

      .attention-member p[data-v-0476bf38] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
        margin-bottom: 2px;
      }

      .member-box[data-v-0476bf38] {
        margin-top: 40px;
        text-align: center;
      }

      .member-box .profile-image[data-v-0476bf38] {
        width: 64px;
        height: 64px;
      }

      .member-box .member-form[data-v-0476bf38] {
        position: relative;
        width: 100%;
        max-width: 180px;
        margin: 8px auto;
      }

      .member-box .member-form .member-form-input[data-v-0476bf38] {
        max-width: 160px;
        width: 100%;
        height: 32px;
        padding: 7px 14px;
        border-radius: 4px;
        background-color: #fff;
        display: inline-block;
      }

      .member-box .member-form .notVerifyEmail[data-v-0476bf38] {
        border: 1px solid #d0021b;
      }

      .member-box .member-form .member-form-button[data-v-0476bf38] {
        height: 32px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #767676;
      }

      .footer[data-v-0476bf38] {
        width: 100%;
        margin: 87px 0 20px;
        border-radius: 2px;
        text-align: right;
      }

      .footer .next-button[data-v-0476bf38] {
        margin: 0 24px 0 0;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #fff;
      }

      .hand[data-v-0476bf38] {
        cursor: pointer;
      }

      .check-icon[data-v-0476bf38] {
        position: absolute;
        top: 2px;
        right: -7px;
      }

      @media (max-width: 576px) {
        .regist-box[data-v-0476bf38] {
          position: absolute;
          width: 100%;
          max-width: 610px;
          min-height: 480px;
          top: 0;
          left: 0;
          -webkit-transform: translateX(0);
          transform: translateX(0);
          border-radius: 0;
          background-color: #fff;
          box-shadow: none;
        }
      }

      .regist-box[data-v-710b3170] {
        position: absolute;
        width: 610px;
        padding: 59px 0 71px;
        left: 50%;
        margin-top: 150px;
        margin-left: -305px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.08);
      }

      .regist-box .title[data-v-710b3170] {
        font-size: 20px;
        line-height: normal;
        color: #333;
      }

      .regist-box .sub-title[data-v-710b3170],
      .regist-box .title[data-v-710b3170] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: -0.2px;
        text-align: center;
      }

      .regist-box .sub-title[data-v-710b3170] {
        font-size: 14px;
        line-height: 1.36;
        margin-top: 14px;
        color: #767676;
      }

      .regist-box .sub-title p[data-v-710b3170] {
        margin-bottom: 0;
      }

      .regist-box .sub-title .detail[data-v-710b3170] {
        margin-top: 5px;
        margin-bottom: 23px;
      }

      .regist-box .input-box[data-v-710b3170] {
        text-align: center;
      }

      .regist-box .input-box .email-input[data-v-710b3170] {
        margin-top: 34px;
        width: 220px;
        height: 32px;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #c3c3c3;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin-left: auto;
        margin-right: auto;
      }

      .regist-box
        .input-box
        .email-input[data-v-710b3170]::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      .regist-box
        .input-box
        .email-input[data-v-710b3170]:-ms-input-placeholder,
      .regist-box
        .input-box
        .email-input[data-v-710b3170]::-ms-input-placeholder {
        color: #c3c3c3;
      }

      .regist-box .input-box .email-input[data-v-710b3170]::placeholder {
        color: #c3c3c3;
      }

      .regist-box .input-box .email-input[data-v-710b3170]:focus {
        border: 1px solid #00afa0;
      }

      .regist-box .input-box .button[data-v-710b3170] {
        width: 220px;
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        background-color: #00afa0;
        border: 1.5px solid #00afa0;
        color: #fff;
      }

      .regist-box .input-box .resetButton[data-v-710b3170] {
        background-color: #fff;
        border: 1.5px solid #00afa0;
        color: #767676;
      }

      @media (max-width: 576px) {
        .regist-box[data-v-710b3170] {
          position: absolute;
          padding: 0 18px;
          width: 100%;
          margin-left: 0;
          max-width: 610px;
          min-height: 480px;
          top: 0;
          left: 0;
          -webkit-transform: translateX(0);
          transform: translateX(0);
          border-radius: 0;
          background-color: #fff;
          box-shadow: none;
        }
      }

      .regist-box[data-v-0c8d3f36] {
        position: absolute;
        width: 100%;
        max-width: 610px;
        top: 130px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.08);
      }

      .progress-button[data-v-0c8d3f36] {
        margin-top: 45px;
        height: 46px;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
      }

      .attention-local[data-v-0c8d3f36] {
        margin-top: 60px;
      }

      .attention-local p[data-v-0c8d3f36] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
        margin-bottom: 2px;
      }

      .local-box[data-v-0c8d3f36] {
        margin-top: 30px;
        text-align: center;
      }

      .local-box span[data-v-0c8d3f36] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
      }

      .local-box .local-form[data-v-0c8d3f36] {
        text-align: center;
        width: 270px;
        margin: 10px auto 0;
        border-radius: 4px;
      }

      .local-box .local-form .search-form-input[data-v-0c8d3f36] {
        width: 100%;
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #9b9b9b;
        border: none;
      }

      .add-city-box[data-v-0c8d3f36] {
        text-align: center;
        margin: 30px 0 0;
      }

      .add-city-box span[data-v-0c8d3f36] {
        text-align: center;
        color: #333;
      }

      .add-city-box .add-city-button[data-v-0c8d3f36],
      .add-city-box span[data-v-0c8d3f36] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .add-city-box .add-city-button[data-v-0c8d3f36] {
        margin: 10px 0 0;
        padding: 6px 14px;
        color: #767676;
        background-color: #fff;
        border-radius: 4px;
        border: 1.5px solid #00afa0;
      }

      .footer[data-v-0c8d3f36] {
        width: 100%;
        border-radius: 2px;
        text-align: right;
        margin: 50px 0 20px;
      }

      .footer .next-button[data-v-0c8d3f36] {
        width: 70px;
        height: 32px;
        margin: 0 24px 0 25px;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      @media (max-width: 576px) {
        .regist-box[data-v-0c8d3f36] {
          position: absolute;
          padding: 0 18px;
          width: 100%;
          max-width: 610px;
          min-height: 480px;
          top: 0;
          left: 0;
          -webkit-transform: translateX(0);
          transform: translateX(0);
          border-radius: 0;
          background-color: #fff;
          box-shadow: none;
        }

        .regist-box .footer .next-button[data-v-0c8d3f36] {
          margin: 0 6px 0 25px;
        }
      }

      .blog {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
      }

      .blog .blog-tags {
        font-size: 16px;
        color: #767676;
      }

      .blog .blog-title {
        font-size: 20px;
        font-weight: 500;
        color: #333;
        margin-top: 10px;
      }

      .blog .blog-sub-title {
        min-height: 20px;
        font-size: 14px;
        color: #767676;
        margin-top: 3px;
      }

      .blog .like-heart {
        vertical-align: -3px;
      }

      .blog .regist-date {
        height: 16px;
        font-size: 12px;
        color: #767676;
        margin-top: 10px;
      }

      .blog .author {
        margin: 40px 0;
      }

      .blog .author .author-detail {
        margin-left: 20px;
      }

      .blog .author .author-home {
        height: 21px;
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }

      .blog .author .author-home .author-from {
        font-weight: 400;
        margin: 0 6px;
      }

      .blog .author .author-introduce {
        height: 24px;
        font-size: 16px;
        color: #767676;
        margin-top: 4px;
      }

      .blog .divide {
        width: 100%;
        height: 1px;
        background-color: #d8d8d8;
        margin: 40px 0;
      }

      .blog .content {
        font-size: 16px;
        line-height: 1.75;
        text-align: left;
        color: #767676;
        margin-bottom: 40px;
      }

      img {
        max-width: 100%;
      }

      @media (max-width: 768px) {
        .blog {
          margin-bottom: 44px;
        }
      }

      @media (max-width: 500px) {
        .blog {
          margin-bottom: 24px;
        }
      }

      .social .facebook {
        background-color: #4d78be;
        border-color: #4d78be;
      }

      .social .facebook,
      .social .line {
        width: 85px;
        height: 36px;
        border-radius: 2px;
      }

      .social .line {
        background-color: #00b900;
        border-color: #00b900;
      }

      .social .url {
        width: 85px;
        height: 36px;
        border-radius: 2px;
        background-color: #00afa0;
        border-color: #00afa0;
      }

      .social .success-text {
        margin-left: 10px;
        height: 19px;
        font-size: 13px;
        color: #00afa0;
      }

      .social .success-text img {
        margin-left: 5px;
      }

      @media (max-width: 576px) {
        .social .success-text {
          position: absolute;
          top: 40px;
          left: 0;
          margin: 0;
          font-size: 13px;
          color: #00afa0;
        }

        .social .success-text img {
          margin-left: 5px;
        }
      }

      .wrapper[data-v-da5034cc] {
        position: relative;
        cursor: pointer;
        background-image: url(/_nuxt/img/blog-writer-background.876e79f.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        padding-bottom: 100%;
        text-align: center;
      }

      .inner[data-v-da5034cc] {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 37px 21px 38px 22px;
      }

      .blogWriter[data-v-da5034cc] {
        margin: -3px 0 16px;
      }

      .subject[data-v-da5034cc] {
        height: 38px;
        font-size: 26px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.31);
      }

      .regist-btn[data-v-da5034cc] {
        width: 111px;
        height: 32px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        padding: 0;
        margin: 0 0 24px;
      }

      .regist-btn span[data-v-da5034cc] {
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #00afa0;
      }

      .content[data-v-da5034cc] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        color: #fff;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        margin-bottom: 22px !important;
      }

      .logo2[data-v-da5034cc] {
        margin: 0 3px;
      }

      .date-box[data-v-da5034cc] {
        font-size: 12px;
        display: inline;
        border-radius: 2px;
        background-color: hsla(0, 0%, 100%, 0.7);
        padding: 5px 14px;
        margin: 0 auto;
        text-align: center;
      }

      .date-box span[data-v-da5034cc] {
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.58;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .rightSideBar[data-v-cc052a4a] {
        max-width: 295px;
      }

      .recommend-title[data-v-cc052a4a] {
        font-size: 20px;
        font-weight: 500;
        text-align: left;
        color: #333;
      }

      .recommend-tags[data-v-cc052a4a],
      .recommend-title[data-v-cc052a4a] {
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .recommend-tags[data-v-cc052a4a] {
        font-size: 16px;
        font-weight: 400;
        color: #767676;
      }

      .categoryWap[data-v-cc052a4a] {
        margin-top: 10px;
      }

      .category[data-v-cc052a4a] {
        border-radius: 2px;
        border: 1px solid #c3c3c3;
        font-size: 0.8rem;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .rightSideNooBlogList[data-v-cc052a4a] {
        font-size: 16px;
        color: #767676;
      }

      @media (max-width: 992px) {
        .rightSideBar[data-v-cc052a4a] {
          max-width: none;
        }
      }

      .review[data-v-adec189e] {
        border-radius: 4px;
        padding: 24px 24px 0;
      }

      .review .profile[data-v-adec189e] {
        max-width: calc(100% - 157px);
      }

      .review .reviewHead[data-v-adec189e] {
        margin-bottom: 10px;
      }

      .review .isLocalReview[data-v-adec189e] {
        padding: 0 12px;
      }

      .review .review-content[data-v-adec189e] {
        word-wrap: break-word;
        word-break: break-all;
        margin: 7px 0 8px;
        font-size: 16px;
        color: #767676;
      }

      .review .replyButton[data-v-adec189e] {
        background: transparent;
        font-weight: 400;
      }

      .review .replyButton[data-v-adec189e],
      .review .review-type[data-v-adec189e] {
        font-size: 14px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #00afa0;
      }

      .review .review-type[data-v-adec189e] {
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content;
        padding: 6px 14px;
        border-radius: 4px;
        font-weight: 500;
      }

      .review .regist-date[data-v-adec189e] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
        margin-bottom: 14px;
      }

      .review .replyWarp[data-v-adec189e] {
        margin-top: 24px;
      }

      @media (max-width: 575px) {
        .profile[data-v-adec189e] {
          max-width: 100% !important;
        }

        .isLocalReview[data-v-adec189e] {
          padding: 10px 0 0 !important;
        }

        .reviewType[data-v-adec189e] {
          margin: 0 !important;
          padding: 20px 0 10px !important;
        }
      }

      #review-input {
        border-radius: 4px;
        background-color: #f5f5f5;
        padding: 24px 24px 20px;
      }

      #review-input .reivew-text-area {
        resize: none;
        padding: 6px 0 0;
        background-color: #f5f5f5;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.75;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
        max-height: 200px;
      }

      #review-input .reivew-text-area:focus {
        border: 0;
        box-shadow: none;
      }

      #review-input .reivew-text-area::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      #review-input .reivew-text-area:-ms-input-placeholder,
      #review-input .reivew-text-area::-ms-input-placeholder {
        color: #c3c3c3;
      }

      #review-input .reivew-text-area::placeholder {
        color: #c3c3c3;
      }

      #review-input .isLocalText {
        font-size: 0.8rem;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 2.15;
        letter-spacing: -0.2px;
        color: #00afa0;
      }

      #review-input .border-secondary {
        border-color: #c3c3c3 !important;
        color: #c3c3c3 !important;
      }

      #review-input .write-button {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
        padding: 6px 14px;
      }

      #review-input .checkBox {
        margin-right: 13px;
      }

      #review-input .modal-dialog {
        max-width: 380px !important;
        width: 100% !important;
        margin: 1.75rem auto !important;
      }

      #review-input .modal-dialog .modal-body {
        position: relative;
        text-align: center;
        padding: 0 30px 22px;
      }

      #review-input .modal-dialog .modal-body .modal-head {
        position: relative;
        top: -32px;
        display: inline-block;
        padding: 5px;
      }

      #review-input .modal-dialog .modal-body .container-fluid {
        margin-top: -12px;
      }

      #review-input
        .modal-dialog
        .modal-body
        .container-fluid
        .upload-target-name {
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
        margin: 0 0 20px;
      }

      #review-input .modal-dialog .modal-body .container-fluid .upload-thank {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        letter-spacing: -0.2px;
        text-align: center;
        color: #767676;
        margin: 0 0 35px;
      }

      #review-input .modal-dialog .modal-body .closeBtn {
        font-size: 15px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #2daca0;
      }

      #review-input .modal-dialog .modal-body .closeBtn:active,
      #review-input .modal-dialog .modal-body .closeBtn:hover {
        text-decoration: none;
      }

      #review-input .basic-modal .modal-dialog {
        max-width: 500px !important;
        width: auto !important;
        margin: 1.75rem auto !important;
      }

      #review-input .basic-modal .modal-dialog .modal-body {
        padding: 16px !important;
      }

      @media (max-width: 767px) {
        #review-input .checkBox {
          margin: 10px 0 24px;
        }
      }

      .review[data-v-af78c428] {
        border-radius: 4px;
        margin-top: 24px;
        padding: 24px;
      }

      .review .profile[data-v-af78c428] {
        max-width: calc(100% - 157px);
      }

      .review .review-content[data-v-af78c428] {
        word-wrap: break-word;
        word-break: break-all;
        margin: 7px 0 0;
        font-size: 16px;
        color: #767676;
      }

      .review .replyButton[data-v-af78c428] {
        background: transparent;
        font-weight: 400;
      }

      .review .replyButton[data-v-af78c428],
      .review .review-type[data-v-af78c428] {
        font-size: 14px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #00afa0;
      }

      .review .review-type[data-v-af78c428] {
        border-radius: 4px;
        font-weight: 500;
      }

      .review .regist-date[data-v-af78c428] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
        margin-bottom: 14px;
      }

      .review .isLocalReview[data-v-af78c428] {
        padding: 0 0 0 12px;
      }

      .review .userInfo[data-v-af78c428] {
        max-width: 100%;
      }

      @media (max-width: 576px) {
        .profile[data-v-af78c428] {
          max-width: 100% !important;
        }

        .isLocalReview[data-v-af78c428] {
          padding: 10px 0 0 !important;
        }
      }

      .member-info .homeText {
        font-weight: 500;
      }

      .member-info .rightHomeText {
        margin: 0 0 0 8px;
      }

      .member-profle[data-v-dabe48cc] {
        margin: 0 0 30px;
      }

      .data div[data-v-dabe48cc] {
        margin: 2px 0;
      }

      .data .nickname[data-v-dabe48cc] {
        font-weight: 500;
        color: #333;
      }

      .data .introduce[data-v-dabe48cc],
      .data .nickname[data-v-dabe48cc] {
        margin-right: 10px;
        font-size: 16px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .data .introduce[data-v-dabe48cc] {
        font-weight: 400;
        color: #767676;
      }

      .member-info[data-v-dabe48cc] {
        margin: 0 0 50px;
      }

      .member-info .icon[data-v-dabe48cc] {
        width: 18px !important;
      }

      .member-info .spot-write[data-v-dabe48cc] {
        margin: 10px 0;
      }

      .member-info .spot-write-icon[data-v-dabe48cc] {
        margin: 0 3px;
      }

      .member-info .spot-count[data-v-dabe48cc] {
        margin: 0 0 0 8px;
        font-family: Raleway;
        font-weight: 500;
      }

      .member-info .homeText[data-v-dabe48cc] {
        font-weight: 500;
      }

      .member-info .rightHomeText[data-v-dabe48cc] {
        margin: 0 0 0 8px;
      }

      .member-info .interest-list[data-v-dabe48cc] {
        margin: 0 0 0 8px;
        font-weight: 500;
      }

      .member-info img[data-v-dabe48cc] {
        vertical-align: inherit;
      }

      .member-info span[data-v-dabe48cc] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .no-data-warp[data-v-dabe48cc] {
        padding: 30px 8px;
      }

      .no-data[data-v-dabe48cc] {
        width: 100%;
        height: 360px;
        background-color: #f5f5f5;
        text-align: center;
        vertical-align: middle;
        padding-top: 128px;
      }

      .no-data span[data-v-dabe48cc] {
        font-weight: 400;
        color: #767676;
      }

      .no-data button[data-v-dabe48cc],
      .no-data span[data-v-dabe48cc] {
        font-size: 16px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .no-data button[data-v-dabe48cc] {
        margin: 20px 0 0;
        padding: 6px 14px;
        font-weight: 500;
        color: #fff;
      }

      .no-data .button-text[data-v-dabe48cc] {
        color: #fff;
      }

      .tab-button-box[data-v-dabe48cc] {
        width: 100%;
      }

      .tab-button-box .bottom-line[data-v-dabe48cc] {
        position: relative;
        top: 1px;
        z-index: 2;
        border-bottom: 2px solid #00afa0;
      }

      .tab-button-box .tab-button[data-v-dabe48cc] {
        position: relative;
        z-index: 1;
        margin-right: 8px;
        margin-bottom: -2px;
        font-size: 16px;
        padding: 6px 14px;
        border-radius: 4px 4px 0 0;
      }

      .tab-button-box .btn-default[data-v-dabe48cc] {
        background-color: #c3c3c3;
        color: #fff;
      }

      .like-blog-title[data-v-dabe48cc],
      .like-spot-title[data-v-dabe48cc],
      .write-spot-title[data-v-dabe48cc] {
        font-size: 20px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin: 26px 8px 20px;
      }

      .profile-image[data-v-dabe48cc] {
        width: 64px;
        height: 64px;
      }

      .search-option-box[data-v-dabe48cc] {
        flex-wrap: nowrap;
        padding: 20px 0 0;
      }

      .search-option-box .type-buttons[data-v-dabe48cc] {
        padding: 0 60px 0 0;
      }

      .search-option-box .type-buttons .type-button[data-v-dabe48cc] {
        display: inline-block;
        font-weight: 400;
      }

      .search-option-box .item[data-v-dabe48cc] {
        padding: 0;
        margin-right: 15px;
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .search-option-box .item[data-v-dabe48cc]:active,
      .search-option-box .item[data-v-dabe48cc]:hover {
        text-decoration: none;
      }

      .search-option-box .active[data-v-dabe48cc] {
        color: #00afa0 !important;
        font-weight: 500 !important;
      }

      .search-option-box .order-button[data-v-dabe48cc] {
        margin: 10px 0 0;
        border-radius: 4px;
        margin-left: auto;
        flex: 0 0 auto;
        width: auto;
        max-width: none;
      }

      .search-option-box .order-button .btn[data-v-dabe48cc] {
        padding: 6px 24px;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .search-option-box .order-button .btn[data-v-dabe48cc]:active,
      .search-option-box .order-button .btn[data-v-dabe48cc]:focus {
        box-shadow: none;
      }

      .search-option-box .order-button .btn-primary[data-v-dabe48cc] {
        color: #fff;
        background-color: #767676;
        border-color: #767676;
        font-weight: 400 !important;
      }

      .search-option-box .order-button .btn-default[data-v-dabe48cc] {
        color: #767676;
        background-color: #fff;
        border-color: #767676;
        font-weight: 400 !important;
      }

      .mypage-tab-content[data-v-dabe48cc] {
        margin: 0 -10px;
      }

      @media (max-width: 992px) {
        .search-option-box[data-v-dabe48cc] {
          flex-wrap: wrap;
        }

        .search-option-box .type-buttons[data-v-dabe48cc] {
          padding: 0;
        }

        .search-option-box .order-button[data-v-dabe48cc] {
          flex: 0 0 100%;
          max-width: 100%;
          margin: 40px 0 0;
        }
      }

      @media (max-width: 768px) {
        .search-option-box[data-v-dabe48cc] {
          flex-wrap: wrap;
        }

        .search-option-box .type-buttons[data-v-dabe48cc] {
          padding: 0;
        }
      }

      #reserve-code .back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 70px);
        background: #e2efee;
      }

      #reserve-code .back .back-header {
        width: 100%;
        height: 144px;
      }

      #reserve-code .header {
        min-height: 94px;
        border-bottom: 1px solid #e2e2e2;
        padding: 0 50px;
      }

      #reserve-code .header .icon {
        width: 33px;
        height: 33px;
        margin-right: 12px;
      }

      #reserve-code .header .text {
        font-size: 20px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      #reserve-code .header .step-warp {
        padding: 0 0 0 4px;
      }

      #reserve-code .header .step-warp .steps .circle {
        padding-top: 1px;
        width: 24px;
        height: 24px;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: -0.2px;
        text-align: center;
        background-color: #c3c3c3;
        color: #fff;
        margin-right: 6px;
      }

      #reserve-code .header .step-warp .steps .right-arrow {
        width: 7px;
        height: 12px;
        margin: 0 20px;
      }

      #reserve-code .header .step-warp .steps .item {
        font-family: Raleway;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        margin-top: -3px;
        color: #c3c3c3;
      }

      #reserve-code .body {
        padding: 30px 50px 42px;
        box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.05);
      }

      #reserve-code .body .reserve-info-input {
        max-width: 220px;
        margin-bottom: 40px;
      }

      #reserve-code .body .reserve-info-input label {
        font-size: 16px;
        color: #333;
        margin-bottom: 12px;
      }

      #reserve-code .body .reserve-info-input input,
      #reserve-code .body .reserve-info-input label {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      #reserve-code .body .reserve-info-input input {
        font-size: 13px;
      }

      #reserve-code .body .reserve-info-input input::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      #reserve-code .body .reserve-info-input input:-ms-input-placeholder,
      #reserve-code .body .reserve-info-input input::-ms-input-placeholder {
        color: #c3c3c3;
      }

      #reserve-code .body .reserve-info-input input::placeholder {
        color: #c3c3c3;
      }

      #reserve-code .body .reserve-info-input .date-input {
        padding: 6px 14px;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #c3c3c3;
      }

      #reserve-code .body .reserve-info-input .city-text {
        font-size: 14px;
      }

      #reserve-code .body .reserve-info-input .text-danger {
        color: #c3c3c3 !important;
      }

      #reserve-code .body .reserve-info-input .product-list .product-warp {
        padding: 20px 0;
        border-bottom: 1px solid #d8d8d8;
      }

      #reserve-code
        .body
        .reserve-info-input
        .product-list
        .product-warp:last-child {
        border-bottom: none;
      }

      #reserve-code .body .reserve-info-input .check-reserve-time-button {
        width: 100%;
        padding: 8px 12px;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #00afa0;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #00afa0;
      }

      #reserve-code
        .body
        .reserve-info-input
        .check-reserve-time-button:disabled {
        border: 1px solid #9b9b9b;
        color: #9b9b9b;
      }

      #reserve-code .body .reserve-info-input .no-time {
        min-height: 112px;
        border-radius: 4px;
        background-color: #f5f5f5;
      }

      #reserve-code .body .reserve-info-input .no-time span {
        vertical-align: middle;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      #reserve-code .body .reserve-info-input .select-time-tabs {
        border: 0;
        margin-bottom: 14px;
      }

      #reserve-code .body .reserve-info-input .select-time-tabs:focus {
        outline: none;
      }

      #reserve-code
        .body
        .reserve-info-input
        .select-time-tabs
        .select-time-tab
        a {
        padding: 0;
        border: 0;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      #reserve-code
        .body
        .reserve-info-input
        .select-time-tabs
        .select-time-tab
        .active {
        color: #00afa0;
      }

      #reserve-code
        .body
        .reserve-info-input
        .select-time-tabs
        .select-time-tab:nth-child(2) {
        margin: 0 20px;
      }

      #reserve-code .body .reserve-info-input .time-contents {
        padding: 16px 29px;
        border-radius: 4px;
        background-color: #f5f5f5;
        text-align: center;
      }

      #reserve-code .body .reserve-info-input .time-contents .time-button {
        padding: 6px 14px;
        border-radius: 4px;
        background-color: #c3c3c3;
        font-family: Raleway;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #fff;
      }

      #reserve-code .body .reserve-info-input .time-contents .select_time {
        background-color: #fdca04;
      }

      #reserve-code .body .reserve-info-input .result-price {
        width: 100%;
        padding: 20px;
        border-radius: 4px;
        background-color: #f5f5f5;
      }

      #reserve-code .body .reserve-info-input .result-price .final-price {
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin-right: 20px;
      }

      #reserve-code .body .reserve-info-input .result-price .discount-price {
        font-size: 15px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
        text-decoration: line-through;
      }

      #reserve-code .body .reserve-info-input .is_not_pay_now {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #00afa0;
      }

      #reserve-code .body .reserve-info-input .icon {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 14px;
      }

      #reserve-code .body .reserve-info-input:last-child {
        margin-bottom: 60px;
      }

      #reserve-code .body .reserve-info-input-large {
        max-width: 500px;
      }

      #reserve-code .body .before-button {
        background-color: transparent;
        border: 1px solid #00afa0;
        color: #00afa0;
      }

      #reserve-code .body .before-button,
      #reserve-code .body .next-button {
        padding: 6px 14px;
        margin-top: 20px;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      #reserve-code .body .next-button {
        color: #fff;
      }

      @media (max-width: 576px) {
        #reserve-code {
          margin-top: -50px;
        }

        #reserve-code .back {
          display: none;
        }

        #reserve-code .header {
          padding: 0;
        }

        #reserve-code .header .spot-name {
          padding: 30px 0;
        }

        #reserve-code .header .step-warp {
          padding: 0 0 30px 4px;
        }

        #reserve-code .body {
          padding: 30px 0 42px;
          box-shadow: none;
        }
      }

      .datepicker-container {
        position: relative;
      }

      .datepicker-container .icon {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 14px;
        cursor: pointer;
      }

      .fade-enter-active[data-v-3f8ed3d8],
      .fade-leave-active[data-v-3f8ed3d8] {
        transition: opacity 0.5s;
      }

      .fade-enter[data-v-3f8ed3d8],
      .fade-leave-active[data-v-3f8ed3d8] {
        opacity: 0;
      }

      .datepicker-slide-enter-active[data-v-3f8ed3d8],
      .datepicker-slide-leave-active[data-v-3f8ed3d8] {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
        transition: all 0.3s ease;
      }

      .datepicker-slide-enter[data-v-3f8ed3d8],
      .datepicker-slide-leave-active[data-v-3f8ed3d8] {
        opacity: 0;
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px);
      }

      .slidev-enter-active[data-v-3f8ed3d8],
      .slidev-leave-active[data-v-3f8ed3d8] {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0);
        transition: all 0.3s ease;
      }

      .slidev-enter-active.off[data-v-3f8ed3d8],
      .slidev-leave-active.off[data-v-3f8ed3d8] {
        transition: all 0s;
      }

      .direction-next.slidev-enter[data-v-3f8ed3d8],
      .slidev-leave[data-v-3f8ed3d8] {
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
        opacity: 0;
      }

      .direction-prev.slidev-leave[data-v-3f8ed3d8],
      .slidev-enter[data-v-3f8ed3d8] {
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
        opacity: 0;
      }

      .slideh-enter-active[data-v-3f8ed3d8],
      .slideh-leave-active[data-v-3f8ed3d8] {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
        transition: all 0.3s ease;
      }

      .slideh-enter-active.off[data-v-3f8ed3d8],
      .slideh-leave-active.off[data-v-3f8ed3d8] {
        transition: all 0s;
      }

      .direction-next.slideh-enter[data-v-3f8ed3d8],
      .slideh-leave[data-v-3f8ed3d8] {
        -webkit-transform: translateY(-100%);
        transform: translateY(-100%);
        opacity: 0;
      }

      .direction-prev.slideh-leave[data-v-3f8ed3d8],
      .slideh-enter[data-v-3f8ed3d8] {
        -webkit-transform: translateY(100%);
        transform: translateY(100%);
        opacity: 0;
      }

      .fade-transition[data-v-3f8ed3d8] {
        opacity: 1;
        transition: all 0.3s ease;
      }

      .fade-enter[data-v-3f8ed3d8],
      .fade-leave[data-v-3f8ed3d8] {
        opacity: 0;
      }

      .mb-40[data-v-3f8ed3d8] {
        margin-bottom: 40px !important;
      }

      .datepicker-body[data-v-3f8ed3d8] {
        padding: 24px 23.5px;
      }

      .datepicker[data-v-3f8ed3d8] {
        position: absolute;
        max-width: 320px;
        width: 100vw;
        background-color: #f9f9f9;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
        color: #333;
        font-size: 16px;
        font-weight: 400;
        z-index: 9999;
      }

      .datepicker-year[data-v-3f8ed3d8] {
        margin-bottom: 10px;
        line-height: 16px;
        position: relative;
        height: 16px;
        opacity: 0.7;
        overflow: hidden;
        cursor: pointer;
      }

      .datepicker-date[data-v-3f8ed3d8] {
        position: relative;
        font-size: 32px;
        line-height: 32px;
        height: 37px;
        overflow: hidden;
      }

      .datepicker-week[data-v-3f8ed3d8] {
        font-size: 12px;
        line-height: 12px;
        color: rgba(0, 0, 0, 0.8);
      }

      .datepicker-weekday[data-v-3f8ed3d8] {
        float: left;
        width: 36px;
        text-align: center;
        font-family: Raleway;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        margin: 0 1.5px;
        color: #333;
      }

      .datepicker-days[data-v-3f8ed3d8] {
        width: 100%;
        padding: 10px 0 0;
        position: relative;
        overflow: hidden;
        float: left;
        transition: height 0.3s cubic-bezier(0.75, 0.02, 0.27, 0.99);
      }

      .datepicker-day[data-v-3f8ed3d8] {
        width: 36px;
        height: 36px;
        text-align: center;
        float: left;
        line-height: 36px;
        cursor: pointer;
        position: relative;
        transition: color 0.45s ease;
        border-radius: 2px;
      }

      .datepicker-day[disabled][data-v-3f8ed3d8] {
        cursor: default;
        color: #ccc;
        background-color: transparent;
      }

      .datepicker-day[disabled] .datepicker-day-effect[data-v-3f8ed3d8] {
        background-color: transparent;
      }

      .datepicker-day[disabled] .datepicker-day-text[data-v-3f8ed3d8] {
        color: #ccc;
      }

      .datepicker-day[data-v-3f8ed3d8]:hover {
        color: #fff;
      }

      .datepicker-day:hover .datepicker-day-effect[data-v-3f8ed3d8] {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 0.6;
      }

      .datepicker-day.selected[data-v-3f8ed3d8] {
        color: #fff;
      }

      .datepicker-day.selected .datepicker-day-effect[data-v-3f8ed3d8] {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
      }

      .show-day[data-v-3f8ed3d8] {
        padding: 10px 10.5px 9px;
        margin: 1.5px;
        background-color: #fff;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
      }

      .datepicker-day-effect[data-v-3f8ed3d8] {
        position: absolute;
        width: 36px;
        height: 36px;
        background-color: #00c9b7;
        top: 0;
        left: 0;
        border-radius: 2px;
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 0;
        transition: all 0.45s ease;
      }

      .datepicker-day-text[data-v-3f8ed3d8] {
        position: relative;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
      }

      .selected .datepicker-day-text[data-v-3f8ed3d8] {
        color: #fff;
      }

      .control-button[data-v-3f8ed3d8] {
        background-color: transparent;
        border: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        outline: none;
        cursor: pointer;
      }

      .control-button svg[data-v-3f8ed3d8] {
        vertical-align: baseline;
      }

      .datepicker-controls[data-v-3f8ed3d8] {
        position: relative;
        z-index: 2;
        max-width: 320px;
        width: 100vw;
        height: 56px;
        line-height: 56px;
        text-align: center;
      }

      .datepicker-arrow[data-v-3f8ed3d8] {
        width: 11px;
        height: 11px;
      }

      .datepicker-month[data-v-3f8ed3d8] {
        max-width: 320px;
        width: 100%;
        position: relative;
        float: left;
        overflow: hidden;
      }

      .datepicker-month-label[data-v-3f8ed3d8] {
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        margin-left: auto;
        margin-right: auto;
        font-family: Raleway;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        color: #333;
      }

      .datepicker-actions[data-v-3f8ed3d8] {
        text-align: right;
        padding: 0 1.5px;
      }

      .datepicker-actions button[data-v-3f8ed3d8] {
        margin-top: 40px;
        padding: 0;
        border: none;
        background-color: transparent;
        display: inline-block;
        cursor: pointer;
        outline: none;
        color: #00e2cf;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        text-align: center;
        -webkit-appearance: none;
        transition: all 0.3s ease;
        font-size: 15px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #00afa0;
      }

      .datepicker-actions button[data-v-3f8ed3d8]:hover {
        background-color: #f2f2f2;
      }

      .datepicker-actions button[data-v-3f8ed3d8]:first-child {
        margin-right: 30px;
        font-size: 15px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .datepicker-years[data-v-3f8ed3d8] {
        max-width: 320px;
        width: 100vw;
        height: 288px;
        background-color: #fff;
        position: absolute;
        z-index: 2;
        margin-top: -56px;
        overflow-y: scroll;
      }

      .datepicker-years
        .datepicker-years-content
        .datepicker-year[data-v-3f8ed3d8] {
        width: 100%;
        text-align: center;
        font-size: 25px;
        line-height: 25px;
        height: 25px;
        margin: 15px 0;
        transition: all 0.3s ease;
      }

      .datepicker-years
        .datepicker-years-content
        .datepicker-year.selected[data-v-3f8ed3d8],
      .datepicker-years
        .datepicker-years-content
        .datepicker-year[data-v-3f8ed3d8]:hover {
        font-size: 30px;
        height: 30px;
        font-weight: 300;
        color: #00afa0;
      }

      .open .dropdown-menu[data-v-65cb7026] {
        display: block;
        padding: 0;
        border-radius: 2px;
      }

      .open .dropdown-menu li[data-v-65cb7026] {
        display: list-item;
        text-align: -webkit-match-parent;
        padding: 3px 20px;
        background-color: #fff;
        color: #000;
        border-bottom: 1px solid #ebebeb;
      }

      .open .dropdown-menu li[data-v-65cb7026]:last-child {
        border-bottom: none;
      }

      .open .dropdown-menu li[data-v-65cb7026]:hover {
        cursor: pointer;
        background-color: #d0d0d0;
        color: #000;
      }

      .open .dropdown-menu li .first-text[data-v-65cb7026] {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #767676;
      }

      .open .dropdown-menu .add-item li .plus-text[data-v-65cb7026],
      .open .dropdown-menu li .add-item .plus-text[data-v-65cb7026],
      .open .dropdown-menu li .second-text[data-v-65cb7026] {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #9b9b9b;
      }

      .open .dropdown-menu .add-item[data-v-65cb7026] {
        background-color: #f9f9f9;
      }

      .open .dropdown-menu .add-item .plus-text[data-v-65cb7026] {
        font-size: 18px;
      }

      .open .dropdown-menu .active[data-v-65cb7026] {
        background-color: #d0d0d0;
        color: #000;
      }

      .icon[data-v-65cb7026] {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 14px;
      }

      #input-email .icons[data-v-bd0a27f8] {
        position: absolute;
        top: 0;
        left: calc(100% + 10px);
      }

      #drop-down-container[data-v-a4ace37c] {
        position: relative;
      }

      #drop-down-container .dropdown[data-v-a4ace37c] {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        float: left;
        min-width: 10rem;
        padding: 0;
        width: 100%;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ebebeb;
        border-radius: 4px;
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.05);
      }

      #drop-down-container .dropdown li[data-v-a4ace37c] {
        padding: 7px 14px;
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
        border-bottom: 1px solid #ebebeb;
      }

      #drop-down-container .dropdown li[data-v-a4ace37c]:hover {
        cursor: pointer;
        background-color: #ebebeb;
        color: #000;
      }

      #drop-down-container .dropdown li[data-v-a4ace37c]:last-child() {
        border: 0;
      }

      #drop-down-container .dropdown .active[data-v-a4ace37c] {
        background-color: #ebebeb;
        color: #000;
      }

      #icon-modal .modal-dialog {
        max-width: 380px;
      }

      #icon-modal .modal-body {
        padding: 68px 0 24px;
      }

      #icon-modal .icon-warp {
        position: absolute;
        width: 64px;
        height: 64px;
        background-color: #fff;
        top: 0;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        padding: 5px;
      }

      #icon-modal .icon-warp .icon {
        width: 100%;
        height: 100%;
      }

      #icon-modal .main-message {
        font-size: 16px;
        font-weight: 500;
        line-height: normal;
        color: #333;
      }

      #icon-modal .main-message,
      #icon-modal .second-message {
        font-style: normal;
        font-stretch: normal;
        letter-spacing: -0.2px;
        text-align: center;
      }

      #icon-modal .second-message {
        margin-top: 6px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.29;
        color: #9b9b9b;
      }

      #icon-modal .button-group {
        margin: 44px auto 0;
        text-align: center;
      }

      #icon-modal .button-group .btn {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: right;
      }

      #icon-modal .button-group .cancle {
        padding: 0;
        color: #767676;
        margin-right: 24px;
        background-color: transparent;
        border: 0;
      }

      #icon-modal .button-group .confirm {
        border-radius: 4px;
        padding: 6px 14px;
      }

      #icon-modal .moreMargin {
        margin-top: 54px;
      }

      .days[data-v-b500ce8a] {
        padding: 19px 23px;
      }

      .times[data-v-b500ce8a] {
        padding: 19px 23px 19px 0;
      }

      .priceWarp[data-v-b500ce8a] {
        padding: 19px 23px;
      }

      .cityAndInterest[data-v-b500ce8a] {
        margin: 0 0 5px;
      }

      .categoryTag[data-v-b500ce8a] {
        margin: 10px 0 26px;
      }

      .avgRating[data-v-b500ce8a] {
        font-weight: 700 !important;
        font-family: Raleway;
      }

      .starRating[data-v-b500ce8a] {
        margin: 0 0 32px;
      }

      .optionBtn[data-v-b500ce8a] {
        margin: 28px 0 0;
      }

      .mr-10px[data-v-b500ce8a] {
        margin-right: 10px;
      }

      .border-bottom[data-v-b500ce8a] {
        padding-bottom: 30px;
        border-bottom: 1px solid #d8d8d8 !important;
      }

      .contrubutorWarp[data-v-b500ce8a] {
        margin-top: 12px;
      }

      .detailText[data-v-b500ce8a] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.75;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .cameraIcon[data-v-b500ce8a] {
        vertical-align: baseline;
        vertical-align: initial;
      }

      .reviewInput[data-v-b500ce8a] {
        margin-bottom: 20px;
      }

      .divide[data-v-b500ce8a] {
        width: 100%;
        height: 1px;
        background-color: #d8d8d8;
        margin: 30px 0;
      }

      .reserve-info-warp[data-v-b500ce8a] {
        padding: 10px 0 0;
      }

      .reserve-info-warp .reserve-info[data-v-b500ce8a] {
        width: 100%;
        padding-bottom: 40px;
      }

      .reserve-info-warp .reserve-info label[data-v-b500ce8a] {
        margin-bottom: 16px;
      }

      .reserve-info-warp .reserve-info ul[data-v-b500ce8a] {
        margin: 0;
        padding: 0;
        list-style-position: inside;
      }

      .reserve-info-warp .reserve-info ul li[data-v-b500ce8a] {
        font-size: 13px;
        color: #767676;
      }

      .reserve-info-warp .reserve-info ul li span[data-v-b500ce8a] {
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.75;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .reserve-info-warp .reserve-info ul li[data-v-b500ce8a]:last-child {
        margin: 0;
      }

      .social-share[data-v-b500ce8a] {
        padding: 0 0 40px;
      }

      .reviewCount[data-v-b500ce8a] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        margin: 0 0 20px;
      }

      .detailInfo[data-v-b500ce8a] {
        font-size: 13px;
        line-height: 1.46;
        color: #767676;
        padding: 5px 0;
      }

      .detailInfo[data-v-b500ce8a],
      .detailInfoLabel[data-v-b500ce8a] {
        white-space: nowrap;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: -0.2px;
      }

      .detailInfoLabel[data-v-b500ce8a] {
        font-size: 14px;
        line-height: 1.36;
        color: #333;
        padding: 0 0 5px;
      }

      .option-button[data-v-b500ce8a] {
        padding: 6px 14px;
        border-radius: 4px;
        border: 1.5px solid #00afa0;
        background: #fff;
        font-size: 0.9rem;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .option-button span[data-v-b500ce8a] {
        color: #767676;
      }

      .tag-text[data-v-b500ce8a] {
        font-size: 1rem;
        color: #767676;
      }

      .reserveLink[data-v-b500ce8a],
      .tag-text[data-v-b500ce8a] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .reserveLink[data-v-b500ce8a] {
        padding: 4px 8px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #00afa0;
        margin: 0 0 0 10px;
        border: 1px solid #00afa0;
      }

      .upload-photo[data-v-b500ce8a] {
        background-color: #e2efee;
      }

      .modalHeader[data-v-b500ce8a] {
        font-size: 1.1rem;
        margin-bottom: 23px;
      }

      .modalHeader .modalTitle[data-v-b500ce8a],
      .modalHeader[data-v-b500ce8a] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .modalHeader .modalTitle[data-v-b500ce8a] {
        font-size: 16px;
      }

      .modalHeader .cameraIcon[data-v-b500ce8a] {
        vertical-align: baseline;
        margin-right: 6px !important;
      }

      .modalHeader .close[data-v-b500ce8a] {
        position: absolute;
        top: 0;
        right: 8px;
        width: 16px;
        height: 15px;
      }

      .modalHeader .close span[data-v-b500ce8a] {
        font-size: 16px;
        color: #767676;
      }

      .modalBottom[data-v-b500ce8a] {
        padding: 0 15px;
      }

      .uploadButton[data-v-b500ce8a] {
        border-radius: 4px;
        font-size: 16px;
        color: #fff;
        padding: 6px 14px;
      }

      .announce-text[data-v-b500ce8a],
      .uploadButton[data-v-b500ce8a] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .announce-text[data-v-b500ce8a] {
        font-size: 13px;
      }

      .dot-text[data-v-b500ce8a] {
        font-size: 1rem;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .modal-dot-left[data-v-b500ce8a] {
        margin-right: 16px;
      }

      .spot-name[data-v-b500ce8a] {
        font-size: 1.6rem;
        font-weight: 500;
      }

      .category[data-v-b500ce8a],
      .spot-name[data-v-b500ce8a] {
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .category[data-v-b500ce8a] {
        padding: 4px 8px !important;
        border-radius: 2px;
        border: 1px solid #c3c3c3;
        font-size: 0.8rem;
        font-weight: 400;
      }

      .google-map[data-v-b500ce8a] {
        min-height: 200px;
        height: 100%;
      }

      .mb-30[data-v-b500ce8a] {
        margin-bottom: 30px;
      }

      .advertise[data-v-b500ce8a] {
        overflow: hidden;
      }

      #spot_detail_info img[data-v-b500ce8a] {
        margin-right: 10px;
      }

      #spot_detail_info .time-icon[data-v-b500ce8a] {
        width: 14px;
      }

      #spot_detail_info .spot-icon[data-v-b500ce8a] {
        width: 11.5px;
      }

      #spot_detail_info .price-icon[data-v-b500ce8a],
      #spot_detail_info .tel-icon[data-v-b500ce8a] {
        width: 14px;
      }

      #spot_detail_info .contribute-icon[data-v-b500ce8a] {
        width: 19px;
      }

      #spot_detail_info td[data-v-b500ce8a] {
        color: #767676;
      }

      #spot_detail_info .infoButton[data-v-b500ce8a],
      #spot_detail_info td[data-v-b500ce8a] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.75;
        letter-spacing: -0.2px;
      }

      #spot_detail_info .infoButton[data-v-b500ce8a] {
        color: #00afa0;
        cursor: pointer;
      }

      #spot_detail_info .infoButton .hoverData[data-v-b500ce8a] {
        visibility: hidden;
        top: 0;
        left: 100%;
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content;
        max-width: -webkit-max-content;
        max-width: -moz-max-content;
        max-width: max-content;
        background: #fff;
        z-index: 10;
      }

      #spot_detail_info .infoButton:hover .hoverData[data-v-b500ce8a] {
        visibility: visible;
      }

      #spot_detail_info .contributor[data-v-b500ce8a] {
        padding-left: 10px;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      #spot_detail_info .isNotData[data-v-b500ce8a] {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.75;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      @media (max-width: 1240px) {
        .mobile-margin[data-v-b500ce8a] {
          padding-left: 10px !important;
        }
      }

      @media (max-width: 768px) {
        #spot-detail-content[data-v-b500ce8a] {
          margin-bottom: 44px;
        }
      }

      @media (max-width: 500px) {
        #spot-detail-content[data-v-b500ce8a] {
          margin-bottom: 24px;
        }

        .mobile-margin[data-v-b500ce8a] {
          padding-left: 10px !important;
        }

        .tooltipWarp[data-v-b500ce8a] {
          flex-wrap: nowrap;
        }
      }

      .advertise-box[data-v-02795b85] {
        width: 100%;
        height: 60px;
      }

      .imageContainer[data-v-34b660b9] {
        margin-left: -10px;
        width: calc(100% + 20px);
      }

      .imageContainer .thumbnailImage[data-v-34b660b9] {
        padding: 0 10px;
        float: left;
        width: 25%;
        cursor: pointer;
      }

      .imageContainer .cover[data-v-34b660b9] {
        background-size: cover !important;
        border-radius: 2px;
      }

      .imageContainer .contain[data-v-34b660b9] {
        background-size: contain !important;
        border-radius: 2px;
      }

      .imageContainer .imageList[data-v-34b660b9] {
        width: 100%;
        overflow: hidden;
      }

      .imageContainer .image[data-v-34b660b9] {
        padding-bottom: 89.1%;
      }

      .imageContainer .modal[data-v-34b660b9] {
        padding: 60px 0;
      }

      .imageContainer .fullImage[data-v-34b660b9] {
        height: calc(100% - 137px);
        margin-bottom: 30px;
      }

      .imageContainer .fullImage .fullImageWarp[data-v-34b660b9] {
        max-width: 1240px;
        overflow: hidden;
      }

      .imageContainer .fullImage .realImage[data-v-34b660b9] {
        height: calc(100vh - 257px);
      }

      .imageContainer .smallImage[data-v-34b660b9] {
        height: 107px;
      }

      .imageContainer .smallImage .smallImageWarp[data-v-34b660b9] {
        max-width: 1240px;
        overflow: hidden;
      }

      .imageContainer .smallImage .smallImageWarp .thumbnail[data-v-34b660b9] {
        height: 107px;
      }

      .imageContainer
        .smallImage
        .smallImageWarp
        .thumbnailBackGround[data-v-34b660b9] {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #000;
        opacity: 0.7;
        width: 100%;
        height: 107px;
      }

      .imageContainer .fullImageButton[data-v-34b660b9] {
        position: absolute;
        left: 20px;
        bottom: 13px;
        border-radius: 2px;
        border: 1.5px solid #00afa0;
        background: #fff;
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .imageContainer .slickButton[data-v-34b660b9] {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      .imageContainer .close[data-v-34b660b9] {
        position: absolute;
        top: 1%;
        right: 1%;
        opacity: 1 !important;
      }

      .imageContainer .leftButton[data-v-34b660b9] {
        left: 1%;
      }

      .imageContainer .rightButton[data-v-34b660b9] {
        right: 1%;
      }

      @media (max-width: 1240px) {
        .imageContainer[data-v-34b660b9] {
          margin-left: -10px;
          width: calc(100% + 20px);
        }

        .imageContainer .thumbnailImage[data-v-34b660b9] {
          width: 33.33%;
        }

        .imageContainer .thumbnailImage[data-v-34b660b9]:nth-child(4) {
          display: none;
        }
      }

      @media (max-width: 1024px) {
        .imageContainer[data-v-34b660b9] {
          margin-left: -10px;
          width: calc(100% + 20px);
        }

        .imageContainer .thumbnailImage[data-v-34b660b9] {
          width: 50%;
        }

        .imageContainer .thumbnailImage[data-v-34b660b9]:nth-child(3) {
          display: none;
        }
      }

      .blog {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
      }

      .blog .blog-tags {
        font-size: 16px;
        color: #767676;
      }

      .blog .blog-title {
        font-size: 24px;
        font-weight: 500;
        color: #333;
        margin-top: 10px;
      }

      .blog .blog-sub-title {
        min-height: 20px;
        font-size: 17px;
        color: #767676;
        margin-top: 3px;
      }

      .blog .like-heart {
        vertical-align: -3px;
      }

      .blog .regist-date {
        height: 16px;
        font-size: 12px;
        color: #767676;
        margin-top: 10px;
      }

      .blog .author {
        margin: 40px 0;
      }

      .blog .divide {
        width: 100%;
        height: 1px;
        background-color: #d8d8d8;
        margin: 40px 0;
      }

      .blog .content {
        font-size: 16px;
        line-height: 1.75;
        text-align: left;
        color: #767676;
        margin-bottom: 40px;
      }

      img {
        max-width: 100%;
      }

      @media (max-width: 768px) {
        .blog {
          margin-bottom: 44px;
        }
      }

      @media (max-width: 500px) {
        .blog {
          margin-bottom: 24px;
        }
      }

      .overflow-hidden[data-v-3a349b57] {
        overflow: hidden;
      }

      .overflow-hidden .slick-position[data-v-3a349b57] {
        margin-left: -10px;
        width: calc(100% + 20px);
      }

      .view-title[data-v-3a349b57] {
        font-size: 20px;
        color: #333;
        margin-bottom: 20px;
      }

      .view-title[data-v-3a349b57],
      .view-total[data-v-3a349b57] {
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .view-total[data-v-3a349b57] {
        font-size: 14px;
        color: #00afa0;
        margin-top: 20px;
      }

      .view-total[data-v-3a349b57] :hover {
        text-decoration: underline;
      }

      .view-total .fa-angle-right[data-v-3a349b57] {
        font-size: 19px;
        margin-left: 6px;
        vertical-align: baseline;
      }

      .advertise-warp[data-v-3a349b57] {
        margin-bottom: 40px;
      }

      @media (max-width: 621px) {
        .showOverlay[data-v-3a349b57] {
          height: calc(100vh - 70px - 50px);
          overflow: hidden;
        }
      }

      .__nuxt-error-page {
        padding: 1rem;
        background: #f7f8fb;
        color: #47494e;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: sans-serif;
        font-weight: 100 !important;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .__nuxt-error-page .error {
        max-width: 450px;
      }

      .__nuxt-error-page .title {
        font-size: 1.5rem;
        margin-top: 15px;
        color: #47494e;
        margin-bottom: 8px;
      }

      .__nuxt-error-page .description {
        color: #7f828b;
        line-height: 21px;
        margin-bottom: 10px;
      }

      .__nuxt-error-page a {
        color: #7f828b !important;
        text-decoration: none;
      }

      .__nuxt-error-page .logo {
        position: fixed;
        left: 12px;
        bottom: 12px;
      }

      .nuxt-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        width: 0;
        transition: width 0.2s, opacity 0.4s;
        opacity: 1;
        background-color: #efc14e;
        z-index: 999999;
      }

      body:lang(zh-TW) {
        font-family: Noto Sans TC, sans-serif;
      }

      body:lang(ko-KR) {
        font-family: Noto Sans KR, sans-serif;
      }

      body:lang(zh-CN) {
        font-family: Noto Sans SC, sans-serif;
      }

      body:lang(en-US) {
        font-family: Raleway, sans-serif;
      }

      body {
        color: #333 !important;
      }

      button:active,
      button:focus {
        box-shadow: none !important;
        outline: none !important;
      }

      .Raleway {
        font-family: Raleway, sans-serif !important;
      }

      .cursor-point {
        cursor: pointer;
      }

      .mb-60 {
        margin-bottom: 60px !important;
      }

      .mb-40 {
        margin-bottom: 40px !important;
      }

      .mb-20 {
        margin-bottom: 20px !important;
      }

      .pb-60 {
        padding-bottom: 60px !important;
      }

      .pb-40 {
        padding-bottom: 40px !important;
      }

      .pb-20 {
        padding-bottom: 20px !important;
      }

      .not-allow {
        cursor: not-allowed;
      }

      .slick-track {
        display: flex !important;
        align-items: center !important;
      }

      .text-bold {
        font-weight: 700;
      }

      .font-weight-500 {
        font-weight: 500;
      }

      .font-weight-300 {
        font-weight: 300;
      }

      .vertical-middle {
        vertical-align: middle;
      }

      :root {
        --blue: #007bff;
        --indigo: #6610f2;
        --purple: #6f42c1;
        --pink: #e83e8c;
        --red: #dc3545;
        --orange: #fd7e14;
        --yellow: #ffc107;
        --green: #28a745;
        --teal: #20c997;
        --cyan: #17a2b8;
        --white: #fff;
        --gray: #6c757d;
        --gray-dark: #343a40;
        --primary: #00afa0;
        --secondary: #6c757d;
        --success: #28a745;
        --info: #17a2b8;
        --warning: #ffc107;
        --danger: #f26f6d;
        --light: #f8f9fa;
        --dark: #333;
        --dark-gray: #9b9b9b;
        --breakpoint-xs: 0;
        --breakpoint-sm: 576px;
        --breakpoint-md: 768px;
        --breakpoint-lg: 992px;
        --breakpoint-xl: 1300px;
        --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI",
          Raleway, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol";
        --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
          "Liberation Mono", "Courier New", monospace;
      }

      *,
      :after,
      :before {
        box-sizing: border-box;
      }

      html {
        font-family: sans-serif;
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -ms-overflow-style: scrollbar;
        -webkit-tap-highlight-color: transparent;
      }

      @-ms-viewport {
        width: device-width;
      }

      article,
      aside,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      main,
      nav,
      section {
        display: block;
      }

      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Raleway,
          Helvetica Neue, Arial, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
        background-color: #fff;
      }

      [tabindex="-1"]:focus {
        outline: 0 !important;
      }

      hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      p {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      abbr[data-original-title],
      abbr[title] {
        text-decoration: underline;
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted;
        cursor: help;
        border-bottom: 0;
      }

      address {
        font-style: normal;
        line-height: inherit;
      }

      address,
      dl,
      ol,
      ul {
        margin-bottom: 1rem;
      }

      dl,
      ol,
      ul {
        margin-top: 0;
      }

      ol ol,
      ol ul,
      ul ol,
      ul ul {
        margin-bottom: 0;
      }

      dt {
        font-weight: 700;
      }

      dd {
        margin-bottom: 0.5rem;
        margin-left: 0;
      }

      blockquote {
        margin: 0 0 1rem;
      }

      dfn {
        font-style: italic;
      }

      b,
      strong {
        font-weight: bolder;
      }

      small {
        font-size: 80%;
      }

      sub,
      sup {
        position: relative;
        font-size: 75%;
        line-height: 0;
        vertical-align: baseline;
      }

      sub {
        bottom: -0.25em;
      }

      sup {
        top: -0.5em;
      }

      a {
        color: #00afa0;
        text-decoration: none;
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
      }

      a:hover {
        color: #00635a;
        text-decoration: underline;
      }

      a:not([href]):not([tabindex]),
      a:not([href]):not([tabindex]):focus,
      a:not([href]):not([tabindex]):hover {
        color: inherit;
        text-decoration: none;
      }

      a:not([href]):not([tabindex]):focus {
        outline: 0;
      }

      code,
      kbd,
      pre,
      samp {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,
          Courier New, monospace;
        font-size: 1em;
      }

      pre {
        margin-top: 0;
        margin-bottom: 1rem;
        overflow: auto;
        -ms-overflow-style: scrollbar;
      }

      figure {
        margin: 0 0 1rem;
      }

      img {
        border-style: none;
      }

      img,
      svg:not(:root) {
        vertical-align: middle;
      }

      svg:not(:root) {
        overflow: hidden;
      }

      table {
        border-collapse: collapse;
      }

      caption {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        color: #6c757d;
        text-align: left;
        caption-side: bottom;
      }

      th {
        text-align: inherit;
      }

      label {
        display: inline-block;
        margin-bottom: 0.5rem;
      }

      button {
        border-radius: 0;
      }

      button:focus {
        outline: 1px dotted;
        outline: 5px auto -webkit-focus-ring-color;
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }

      button,
      input {
        overflow: visible;
      }

      button,
      select {
        text-transform: none;
      }

      [type="reset"],
      [type="submit"],
      button,
      html [type="button"] {
        -webkit-appearance: button;
      }

      [type="button"]::-moz-focus-inner,
      [type="reset"]::-moz-focus-inner,
      [type="submit"]::-moz-focus-inner,
      button::-moz-focus-inner {
        padding: 0;
        border-style: none;
      }

      input[type="checkbox"],
      input[type="radio"] {
        box-sizing: border-box;
        padding: 0;
      }

      input[type="date"],
      input[type="datetime-local"],
      input[type="month"],
      input[type="time"] {
        -webkit-appearance: listbox;
      }

      textarea {
        overflow: auto;
        resize: vertical;
      }

      fieldset {
        min-width: 0;
        padding: 0;
        margin: 0;
        border: 0;
      }

      legend {
        display: block;
        width: 100%;
        max-width: 100%;
        padding: 0;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        line-height: inherit;
        color: inherit;
        white-space: normal;
      }

      progress {
        vertical-align: baseline;
      }

      [type="number"]::-webkit-inner-spin-button,
      [type="number"]::-webkit-outer-spin-button {
        height: auto;
      }

      [type="search"] {
        outline-offset: -2px;
        -webkit-appearance: none;
      }

      [type="search"]::-webkit-search-cancel-button,
      [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
      }

      ::-webkit-file-upload-button {
        font: inherit;
        -webkit-appearance: button;
      }

      output {
        display: inline-block;
      }

      summary {
        display: list-item;
        cursor: pointer;
      }

      template {
        display: none;
      }

      [hidden] {
        display: none !important;
      }

      .h1,
      .h2,
      .h3,
      .h4,
      .h5,
      .h6,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 0.5rem;
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        color: inherit;
      }

      .h1,
      h1 {
        font-size: 2.5rem;
      }

      .h2,
      h2 {
        font-size: 2rem;
      }

      .h3,
      h3 {
        font-size: 1.75rem;
      }

      .h4,
      h4 {
        font-size: 1.5rem;
      }

      .h5,
      h5 {
        font-size: 1.25rem;
      }

      .h6,
      h6 {
        font-size: 1rem;
      }

      .lead {
        font-size: 1.25rem;
        font-weight: 300;
      }

      .display-1 {
        font-size: 6rem;
      }

      .display-1,
      .display-2 {
        font-weight: 300;
        line-height: 1.2;
      }

      .display-2 {
        font-size: 5.5rem;
      }

      .display-3 {
        font-size: 4.5rem;
      }

      .display-3,
      .display-4 {
        font-weight: 300;
        line-height: 1.2;
      }

      .display-4 {
        font-size: 3.5rem;
      }

      hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .small,
      small {
        font-size: 80%;
        font-weight: 400;
      }

      .mark,
      mark {
        padding: 0.2em;
        background-color: #fcf8e3;
      }

      .list-inline,
      .list-unstyled {
        padding-left: 0;
        list-style: none;
      }

      .list-inline-item {
        display: inline-block;
      }

      .list-inline-item:not(:last-child) {
        margin-right: 0.5rem;
      }

      .initialism {
        font-size: 90%;
        text-transform: uppercase;
      }

      .blockquote {
        margin-bottom: 1rem;
        font-size: 1.25rem;
      }

      .blockquote-footer {
        display: block;
        font-size: 80%;
        color: #6c757d;
      }

      .blockquote-footer:before {
        content: "\\2014   \A0";
      }

      .img-fluid,
      .img-thumbnail {
        max-width: 100%;
        height: auto;
      }

      .img-thumbnail {
        padding: 0.25rem;
        background-color: #fff;
        border: 1px solid #dee2e6;
        border-radius: 0.25rem;
      }

      .figure {
        display: inline-block;
      }

      .figure-img {
        margin-bottom: 0.5rem;
        line-height: 1;
      }

      .figure-caption {
        font-size: 90%;
        color: #6c757d;
      }

      code {
        font-size: 87.5%;
        color: #e83e8c;
        word-break: break-word;
      }

      a > code {
        color: inherit;
      }

      kbd {
        padding: 0.2rem 0.4rem;
        font-size: 87.5%;
        color: #fff;
        background-color: #212529;
        border-radius: 0.2rem;
      }

      kbd kbd {
        padding: 0;
        font-size: 100%;
        font-weight: 700;
      }

      pre {
        display: block;
        font-size: 87.5%;
        color: #212529;
      }

      pre code {
        font-size: inherit;
        color: inherit;
        word-break: normal;
      }

      .pre-scrollable {
        max-height: 340px;
        overflow-y: scroll;
      }

      .container {
        width: 100%;
        padding-right: 10px;
        padding-left: 10px;
        margin-right: auto;
        margin-left: auto;
      }

      @media (min-width: 576px) {
        .container {
          max-width: 540px;
        }
      }

      @media (min-width: 768px) {
        .container {
          max-width: 720;
        }
      }

      @media (min-width: 992px) {
        .container {
          max-width: 960px;
        }
      }

      @media (min-width: 1300px) {
        .container {
          max-width: 1260px;
        }
      }

      .container-fluid {
        width: 100%;
        padding-right: 10px;
        padding-left: 10px;
        margin-right: auto;
        margin-left: auto;
      }

      .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -10px;
        margin-left: -10px;
      }

      .no-gutters {
        margin-right: 0;
        margin-left: 0;
      }

      .no-gutters > .col,
      .no-gutters > [class*="col-"] {
        padding-right: 0;
        padding-left: 0;
      }

      .col,
      .col-1,
      .col-2,
      .col-3,
      .col-4,
      .col-5,
      .col-6,
      .col-7,
      .col-8,
      .col-9,
      .col-10,
      .col-11,
      .col-12,
      .col-auto,
      .col-lg,
      .col-lg-1,
      .col-lg-2,
      .col-lg-3,
      .col-lg-4,
      .col-lg-5,
      .col-lg-6,
      .col-lg-7,
      .col-lg-8,
      .col-lg-9,
      .col-lg-10,
      .col-lg-11,
      .col-lg-12,
      .col-lg-auto,
      .col-md,
      .col-md-1,
      .col-md-2,
      .col-md-3,
      .col-md-4,
      .col-md-5,
      .col-md-6,
      .col-md-7,
      .col-md-8,
      .col-md-9,
      .col-md-10,
      .col-md-11,
      .col-md-12,
      .col-md-auto,
      .col-sm,
      .col-sm-1,
      .col-sm-2,
      .col-sm-3,
      .col-sm-4,
      .col-sm-5,
      .col-sm-6,
      .col-sm-7,
      .col-sm-8,
      .col-sm-9,
      .col-sm-10,
      .col-sm-11,
      .col-sm-12,
      .col-sm-auto,
      .col-xl,
      .col-xl-1,
      .col-xl-2,
      .col-xl-3,
      .col-xl-4,
      .col-xl-5,
      .col-xl-6,
      .col-xl-7,
      .col-xl-8,
      .col-xl-9,
      .col-xl-10,
      .col-xl-11,
      .col-xl-12,
      .col-xl-auto {
        position: relative;
        width: 100%;
        min-height: 1px;
        padding-right: 10px;
        padding-left: 10px;
      }

      .col {
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
      }

      .col-auto {
        flex: 0 0 auto;
        width: auto;
        max-width: none;
      }

      .col-1 {
        flex: 0 0 8.33333%;
        max-width: 8.33333%;
      }

      .col-2 {
        flex: 0 0 16.66667%;
        max-width: 16.66667%;
      }

      .col-3 {
        flex: 0 0 25%;
        max-width: 25%;
      }

      .col-4 {
        flex: 0 0 33.33333%;
        max-width: 33.33333%;
      }

      .col-5 {
        flex: 0 0 41.66667%;
        max-width: 41.66667%;
      }

      .col-6 {
        flex: 0 0 50%;
        max-width: 50%;
      }

      .col-7 {
        flex: 0 0 58.33333%;
        max-width: 58.33333%;
      }

      .col-8 {
        flex: 0 0 66.66667%;
        max-width: 66.66667%;
      }

      .col-9 {
        flex: 0 0 75%;
        max-width: 75%;
      }

      .col-10 {
        flex: 0 0 83.33333%;
        max-width: 83.33333%;
      }

      .col-11 {
        flex: 0 0 91.66667%;
        max-width: 91.66667%;
      }

      .col-12 {
        flex: 0 0 100%;
        max-width: 100%;
      }

      .order-first {
        order: -1;
      }

      .order-last {
        order: 13;
      }

      .order-0 {
        order: 0;
      }

      .order-1 {
        order: 1;
      }

      .order-2 {
        order: 2;
      }

      .order-3 {
        order: 3;
      }

      .order-4 {
        order: 4;
      }

      .order-5 {
        order: 5;
      }

      .order-6 {
        order: 6;
      }

      .order-7 {
        order: 7;
      }

      .order-8 {
        order: 8;
      }

      .order-9 {
        order: 9;
      }

      .order-10 {
        order: 10;
      }

      .order-11 {
        order: 11;
      }

      .order-12 {
        order: 12;
      }

      .offset-1 {
        margin-left: 8.33333%;
      }

      .offset-2 {
        margin-left: 16.66667%;
      }

      .offset-3 {
        margin-left: 25%;
      }

      .offset-4 {
        margin-left: 33.33333%;
      }

      .offset-5 {
        margin-left: 41.66667%;
      }

      .offset-6 {
        margin-left: 50%;
      }

      .offset-7 {
        margin-left: 58.33333%;
      }

      .offset-8 {
        margin-left: 66.66667%;
      }

      .offset-9 {
        margin-left: 75%;
      }

      .offset-10 {
        margin-left: 83.33333%;
      }

      .offset-11 {
        margin-left: 91.66667%;
      }

      @media (min-width: 576px) {
        .col-sm {
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
        }

        .col-sm-auto {
          flex: 0 0 auto;
          width: auto;
          max-width: none;
        }

        .col-sm-1 {
          flex: 0 0 8.33333%;
          max-width: 8.33333%;
        }

        .col-sm-2 {
          flex: 0 0 16.66667%;
          max-width: 16.66667%;
        }

        .col-sm-3 {
          flex: 0 0 25%;
          max-width: 25%;
        }

        .col-sm-4 {
          flex: 0 0 33.33333%;
          max-width: 33.33333%;
        }

        .col-sm-5 {
          flex: 0 0 41.66667%;
          max-width: 41.66667%;
        }

        .col-sm-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .col-sm-7 {
          flex: 0 0 58.33333%;
          max-width: 58.33333%;
        }

        .col-sm-8 {
          flex: 0 0 66.66667%;
          max-width: 66.66667%;
        }

        .col-sm-9 {
          flex: 0 0 75%;
          max-width: 75%;
        }

        .col-sm-10 {
          flex: 0 0 83.33333%;
          max-width: 83.33333%;
        }

        .col-sm-11 {
          flex: 0 0 91.66667%;
          max-width: 91.66667%;
        }

        .col-sm-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .order-sm-first {
          order: -1;
        }

        .order-sm-last {
          order: 13;
        }

        .order-sm-0 {
          order: 0;
        }

        .order-sm-1 {
          order: 1;
        }

        .order-sm-2 {
          order: 2;
        }

        .order-sm-3 {
          order: 3;
        }

        .order-sm-4 {
          order: 4;
        }

        .order-sm-5 {
          order: 5;
        }

        .order-sm-6 {
          order: 6;
        }

        .order-sm-7 {
          order: 7;
        }

        .order-sm-8 {
          order: 8;
        }

        .order-sm-9 {
          order: 9;
        }

        .order-sm-10 {
          order: 10;
        }

        .order-sm-11 {
          order: 11;
        }

        .order-sm-12 {
          order: 12;
        }

        .offset-sm-0 {
          margin-left: 0;
        }

        .offset-sm-1 {
          margin-left: 8.33333%;
        }

        .offset-sm-2 {
          margin-left: 16.66667%;
        }

        .offset-sm-3 {
          margin-left: 25%;
        }

        .offset-sm-4 {
          margin-left: 33.33333%;
        }

        .offset-sm-5 {
          margin-left: 41.66667%;
        }

        .offset-sm-6 {
          margin-left: 50%;
        }

        .offset-sm-7 {
          margin-left: 58.33333%;
        }

        .offset-sm-8 {
          margin-left: 66.66667%;
        }

        .offset-sm-9 {
          margin-left: 75%;
        }

        .offset-sm-10 {
          margin-left: 83.33333%;
        }

        .offset-sm-11 {
          margin-left: 91.66667%;
        }
      }

      @media (min-width: 768px) {
        .col-md {
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
        }

        .col-md-auto {
          flex: 0 0 auto;
          width: auto;
          max-width: none;
        }

        .col-md-1 {
          flex: 0 0 8.33333%;
          max-width: 8.33333%;
        }

        .col-md-2 {
          flex: 0 0 16.66667%;
          max-width: 16.66667%;
        }

        .col-md-3 {
          flex: 0 0 25%;
          max-width: 25%;
        }

        .col-md-4 {
          flex: 0 0 33.33333%;
          max-width: 33.33333%;
        }

        .col-md-5 {
          flex: 0 0 41.66667%;
          max-width: 41.66667%;
        }

        .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .col-md-7 {
          flex: 0 0 58.33333%;
          max-width: 58.33333%;
        }

        .col-md-8 {
          flex: 0 0 66.66667%;
          max-width: 66.66667%;
        }

        .col-md-9 {
          flex: 0 0 75%;
          max-width: 75%;
        }

        .col-md-10 {
          flex: 0 0 83.33333%;
          max-width: 83.33333%;
        }

        .col-md-11 {
          flex: 0 0 91.66667%;
          max-width: 91.66667%;
        }

        .col-md-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .order-md-first {
          order: -1;
        }

        .order-md-last {
          order: 13;
        }

        .order-md-0 {
          order: 0;
        }

        .order-md-1 {
          order: 1;
        }

        .order-md-2 {
          order: 2;
        }

        .order-md-3 {
          order: 3;
        }

        .order-md-4 {
          order: 4;
        }

        .order-md-5 {
          order: 5;
        }

        .order-md-6 {
          order: 6;
        }

        .order-md-7 {
          order: 7;
        }

        .order-md-8 {
          order: 8;
        }

        .order-md-9 {
          order: 9;
        }

        .order-md-10 {
          order: 10;
        }

        .order-md-11 {
          order: 11;
        }

        .order-md-12 {
          order: 12;
        }

        .offset-md-0 {
          margin-left: 0;
        }

        .offset-md-1 {
          margin-left: 8.33333%;
        }

        .offset-md-2 {
          margin-left: 16.66667%;
        }

        .offset-md-3 {
          margin-left: 25%;
        }

        .offset-md-4 {
          margin-left: 33.33333%;
        }

        .offset-md-5 {
          margin-left: 41.66667%;
        }

        .offset-md-6 {
          margin-left: 50%;
        }

        .offset-md-7 {
          margin-left: 58.33333%;
        }

        .offset-md-8 {
          margin-left: 66.66667%;
        }

        .offset-md-9 {
          margin-left: 75%;
        }

        .offset-md-10 {
          margin-left: 83.33333%;
        }

        .offset-md-11 {
          margin-left: 91.66667%;
        }
      }

      @media (min-width: 992px) {
        .col-lg {
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
        }

        .col-lg-auto {
          flex: 0 0 auto;
          width: auto;
          max-width: none;
        }

        .col-lg-1 {
          flex: 0 0 8.33333%;
          max-width: 8.33333%;
        }

        .col-lg-2 {
          flex: 0 0 16.66667%;
          max-width: 16.66667%;
        }

        .col-lg-3 {
          flex: 0 0 25%;
          max-width: 25%;
        }

        .col-lg-4 {
          flex: 0 0 33.33333%;
          max-width: 33.33333%;
        }

        .col-lg-5 {
          flex: 0 0 41.66667%;
          max-width: 41.66667%;
        }

        .col-lg-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .col-lg-7 {
          flex: 0 0 58.33333%;
          max-width: 58.33333%;
        }

        .col-lg-8 {
          flex: 0 0 66.66667%;
          max-width: 66.66667%;
        }

        .col-lg-9 {
          flex: 0 0 75%;
          max-width: 75%;
        }

        .col-lg-10 {
          flex: 0 0 83.33333%;
          max-width: 83.33333%;
        }

        .col-lg-11 {
          flex: 0 0 91.66667%;
          max-width: 91.66667%;
        }

        .col-lg-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .order-lg-first {
          order: -1;
        }

        .order-lg-last {
          order: 13;
        }

        .order-lg-0 {
          order: 0;
        }

        .order-lg-1 {
          order: 1;
        }

        .order-lg-2 {
          order: 2;
        }

        .order-lg-3 {
          order: 3;
        }

        .order-lg-4 {
          order: 4;
        }

        .order-lg-5 {
          order: 5;
        }

        .order-lg-6 {
          order: 6;
        }

        .order-lg-7 {
          order: 7;
        }

        .order-lg-8 {
          order: 8;
        }

        .order-lg-9 {
          order: 9;
        }

        .order-lg-10 {
          order: 10;
        }

        .order-lg-11 {
          order: 11;
        }

        .order-lg-12 {
          order: 12;
        }

        .offset-lg-0 {
          margin-left: 0;
        }

        .offset-lg-1 {
          margin-left: 8.33333%;
        }

        .offset-lg-2 {
          margin-left: 16.66667%;
        }

        .offset-lg-3 {
          margin-left: 25%;
        }

        .offset-lg-4 {
          margin-left: 33.33333%;
        }

        .offset-lg-5 {
          margin-left: 41.66667%;
        }

        .offset-lg-6 {
          margin-left: 50%;
        }

        .offset-lg-7 {
          margin-left: 58.33333%;
        }

        .offset-lg-8 {
          margin-left: 66.66667%;
        }

        .offset-lg-9 {
          margin-left: 75%;
        }

        .offset-lg-10 {
          margin-left: 83.33333%;
        }

        .offset-lg-11 {
          margin-left: 91.66667%;
        }
      }

      @media (min-width: 1300px) {
        .col-xl {
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
        }

        .col-xl-auto {
          flex: 0 0 auto;
          width: auto;
          max-width: none;
        }

        .col-xl-1 {
          flex: 0 0 8.33333%;
          max-width: 8.33333%;
        }

        .col-xl-2 {
          flex: 0 0 16.66667%;
          max-width: 16.66667%;
        }

        .col-xl-3 {
          flex: 0 0 25%;
          max-width: 25%;
        }

        .col-xl-4 {
          flex: 0 0 33.33333%;
          max-width: 33.33333%;
        }

        .col-xl-5 {
          flex: 0 0 41.66667%;
          max-width: 41.66667%;
        }

        .col-xl-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .col-xl-7 {
          flex: 0 0 58.33333%;
          max-width: 58.33333%;
        }

        .col-xl-8 {
          flex: 0 0 66.66667%;
          max-width: 66.66667%;
        }

        .col-xl-9 {
          flex: 0 0 75%;
          max-width: 75%;
        }

        .col-xl-10 {
          flex: 0 0 83.33333%;
          max-width: 83.33333%;
        }

        .col-xl-11 {
          flex: 0 0 91.66667%;
          max-width: 91.66667%;
        }

        .col-xl-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .order-xl-first {
          order: -1;
        }

        .order-xl-last {
          order: 13;
        }

        .order-xl-0 {
          order: 0;
        }

        .order-xl-1 {
          order: 1;
        }

        .order-xl-2 {
          order: 2;
        }

        .order-xl-3 {
          order: 3;
        }

        .order-xl-4 {
          order: 4;
        }

        .order-xl-5 {
          order: 5;
        }

        .order-xl-6 {
          order: 6;
        }

        .order-xl-7 {
          order: 7;
        }

        .order-xl-8 {
          order: 8;
        }

        .order-xl-9 {
          order: 9;
        }

        .order-xl-10 {
          order: 10;
        }

        .order-xl-11 {
          order: 11;
        }

        .order-xl-12 {
          order: 12;
        }

        .offset-xl-0 {
          margin-left: 0;
        }

        .offset-xl-1 {
          margin-left: 8.33333%;
        }

        .offset-xl-2 {
          margin-left: 16.66667%;
        }

        .offset-xl-3 {
          margin-left: 25%;
        }

        .offset-xl-4 {
          margin-left: 33.33333%;
        }

        .offset-xl-5 {
          margin-left: 41.66667%;
        }

        .offset-xl-6 {
          margin-left: 50%;
        }

        .offset-xl-7 {
          margin-left: 58.33333%;
        }

        .offset-xl-8 {
          margin-left: 66.66667%;
        }

        .offset-xl-9 {
          margin-left: 75%;
        }

        .offset-xl-10 {
          margin-left: 83.33333%;
        }

        .offset-xl-11 {
          margin-left: 91.66667%;
        }
      }

      .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 1rem;
        background-color: transparent;
      }

      .table td,
      .table th {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
      }

      .table thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #dee2e6;
      }

      .table tbody + tbody {
        border-top: 2px solid #dee2e6;
      }

      .table .table {
        background-color: #fff;
      }

      .table-sm td,
      .table-sm th {
        padding: 0.3rem;
      }

      .table-bordered,
      .table-bordered td,
      .table-bordered th {
        border: 1px solid #dee2e6;
      }

      .table-bordered thead td,
      .table-bordered thead th {
        border-bottom-width: 2px;
      }

      .table-borderless tbody + tbody,
      .table-borderless td,
      .table-borderless th,
      .table-borderless thead th {
        border: 0;
      }

      .table-striped tbody tr:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, 0.05);
      }

      .table-hover tbody tr:hover {
        background-color: rgba(0, 0, 0, 0.075);
      }

      .table-primary,
      .table-primary > td,
      .table-primary > th {
        background-color: #b8e9e4;
      }

      .table-hover .table-primary:hover,
      .table-hover .table-primary:hover > td,
      .table-hover .table-primary:hover > th {
        background-color: #a5e3dd;
      }

      .table-secondary,
      .table-secondary > td,
      .table-secondary > th {
        background-color: #d6d8db;
      }

      .table-hover .table-secondary:hover,
      .table-hover .table-secondary:hover > td,
      .table-hover .table-secondary:hover > th {
        background-color: #c8cbcf;
      }

      .table-success,
      .table-success > td,
      .table-success > th {
        background-color: #c3e6cb;
      }

      .table-hover .table-success:hover,
      .table-hover .table-success:hover > td,
      .table-hover .table-success:hover > th {
        background-color: #b1dfbb;
      }

      .table-info,
      .table-info > td,
      .table-info > th {
        background-color: #bee5eb;
      }

      .table-hover .table-info:hover,
      .table-hover .table-info:hover > td,
      .table-hover .table-info:hover > th {
        background-color: #abdde5;
      }

      .table-warning,
      .table-warning > td,
      .table-warning > th {
        background-color: #ffeeba;
      }

      .table-hover .table-warning:hover,
      .table-hover .table-warning:hover > td,
      .table-hover .table-warning:hover > th {
        background-color: #ffe8a1;
      }

      .table-danger,
      .table-danger > td,
      .table-danger > th {
        background-color: #fbd7d6;
      }

      .table-hover .table-danger:hover,
      .table-hover .table-danger:hover > td,
      .table-hover .table-danger:hover > th {
        background-color: #f9c0bf;
      }

      .table-light,
      .table-light > td,
      .table-light > th {
        background-color: #fdfdfe;
      }

      .table-hover .table-light:hover,
      .table-hover .table-light:hover > td,
      .table-hover .table-light:hover > th {
        background-color: #ececf6;
      }

      .table-dark,
      .table-dark > td,
      .table-dark > th {
        background-color: #c6c6c6;
      }

      .table-hover .table-dark:hover,
      .table-hover .table-dark:hover > td,
      .table-hover .table-dark:hover > th {
        background-color: #b9b9b9;
      }

      .table-dark-gray,
      .table-dark-gray > td,
      .table-dark-gray > th {
        background-color: #e3e3e3;
      }

      .table-hover .table-dark-gray:hover,
      .table-hover .table-dark-gray:hover > td,
      .table-hover .table-dark-gray:hover > th {
        background-color: #d6d6d6;
      }

      .table-active,
      .table-active > td,
      .table-active > th,
      .table-hover .table-active:hover,
      .table-hover .table-active:hover > td,
      .table-hover .table-active:hover > th {
        background-color: rgba(0, 0, 0, 0.075);
      }

      .table .thead-dark th {
        color: #fff;
        background-color: #212529;
        border-color: #32383e;
      }

      .table .thead-light th {
        color: #495057;
        background-color: #e9ecef;
        border-color: #dee2e6;
      }

      .table-dark {
        color: #fff;
        background-color: #212529;
      }

      .table-dark td,
      .table-dark th,
      .table-dark thead th {
        border-color: #32383e;
      }

      .table-dark.table-bordered {
        border: 0;
      }

      .table-dark.table-striped tbody tr:nth-of-type(odd) {
        background-color: hsla(0, 0%, 100%, 0.05);
      }

      .table-dark.table-hover tbody tr:hover {
        background-color: hsla(0, 0%, 100%, 0.075);
      }

      @media (max-width: 575.98px) {
        .table-responsive-sm {
          display: block;
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: -ms-autohiding-scrollbar;
        }

        .table-responsive-sm > .table-bordered {
          border: 0;
        }
      }

      @media (max-width: 767.98px) {
        .table-responsive-md {
          display: block;
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: -ms-autohiding-scrollbar;
        }

        .table-responsive-md > .table-bordered {
          border: 0;
        }
      }

      @media (max-width: 991.98px) {
        .table-responsive-lg {
          display: block;
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: -ms-autohiding-scrollbar;
        }

        .table-responsive-lg > .table-bordered {
          border: 0;
        }
      }

      @media (max-width: 1299.98px) {
        .table-responsive-xl {
          display: block;
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: -ms-autohiding-scrollbar;
        }

        .table-responsive-xl > .table-bordered {
          border: 0;
        }
      }

      .table-responsive {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: -ms-autohiding-scrollbar;
      }

      .table-responsive > .table-bordered {
        border: 0;
      }

      .form-control {
        display: block;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .form-control {
          transition: none;
        }
      }

      .form-control::-ms-expand {
        background-color: transparent;
        border: 0;
      }

      .form-control:focus {
        color: #495057;
        background-color: #fff;
        border-color: #30ffed;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 175, 160, 0.25);
      }

      .form-control::-webkit-input-placeholder {
        color: #6c757d;
        opacity: 1;
      }

      .form-control:-ms-input-placeholder,
      .form-control::-ms-input-placeholder {
        color: #6c757d;
        opacity: 1;
      }

      .form-control::placeholder {
        color: #6c757d;
        opacity: 1;
      }

      .form-control:disabled,
      .form-control[readonly] {
        background-color: #e9ecef;
        opacity: 1;
      }

      select.form-control:not([size]):not([multiple]) {
        height: calc(2.25rem + 2px);
      }

      select.form-control:focus::-ms-value {
        color: #495057;
        background-color: #fff;
      }

      .form-control-file,
      .form-control-range {
        display: block;
        width: 100%;
      }

      .col-form-label {
        padding-top: calc(0.375rem + 1px);
        padding-bottom: calc(0.375rem + 1px);
        margin-bottom: 0;
        font-size: inherit;
        line-height: 1.5;
      }

      .col-form-label-lg {
        padding-top: calc(0.5rem + 1px);
        padding-bottom: calc(0.5rem + 1px);
        font-size: 1.25rem;
        line-height: 1.5;
      }

      .col-form-label-sm {
        padding-top: calc(0.25rem + 1px);
        padding-bottom: calc(0.25rem + 1px);
        font-size: 0.875rem;
        line-height: 1.5;
      }

      .form-control-plaintext {
        display: block;
        width: 100%;
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        margin-bottom: 0;
        line-height: 1.5;
        color: #212529;
        background-color: transparent;
        border: solid transparent;
        border-width: 1px 0;
      }

      .form-control-plaintext.form-control-lg,
      .form-control-plaintext.form-control-sm,
      .input-group-lg > .form-control-plaintext.form-control,
      .input-group-lg > .input-group-append > .form-control-plaintext.btn,
      .input-group-lg
        > .input-group-append
        > .form-control-plaintext.input-group-text,
      .input-group-lg > .input-group-prepend > .form-control-plaintext.btn,
      .input-group-lg
        > .input-group-prepend
        > .form-control-plaintext.input-group-text,
      .input-group-sm > .form-control-plaintext.form-control,
      .input-group-sm > .input-group-append > .form-control-plaintext.btn,
      .input-group-sm
        > .input-group-append
        > .form-control-plaintext.input-group-text,
      .input-group-sm > .input-group-prepend > .form-control-plaintext.btn,
      .input-group-sm
        > .input-group-prepend
        > .form-control-plaintext.input-group-text {
        padding-right: 0;
        padding-left: 0;
      }

      .form-control-sm,
      .input-group-sm > .form-control,
      .input-group-sm > .input-group-append > .btn,
      .input-group-sm > .input-group-append > .input-group-text,
      .input-group-sm > .input-group-prepend > .btn,
      .input-group-sm > .input-group-prepend > .input-group-text {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.2rem;
      }

      .input-group-sm
        > .input-group-append
        > select.btn:not([size]):not([multiple]),
      .input-group-sm
        > .input-group-append
        > select.input-group-text:not([size]):not([multiple]),
      .input-group-sm
        > .input-group-prepend
        > select.btn:not([size]):not([multiple]),
      .input-group-sm
        > .input-group-prepend
        > select.input-group-text:not([size]):not([multiple]),
      .input-group-sm > select.form-control:not([size]):not([multiple]),
      select.form-control-sm:not([size]):not([multiple]) {
        height: calc(1.8125rem + 2px);
      }

      .form-control-lg,
      .input-group-lg > .form-control,
      .input-group-lg > .input-group-append > .btn,
      .input-group-lg > .input-group-append > .input-group-text,
      .input-group-lg > .input-group-prepend > .btn,
      .input-group-lg > .input-group-prepend > .input-group-text {
        padding: 0.5rem 1rem;
        font-size: 1.25rem;
        line-height: 1.5;
        border-radius: 0.3rem;
      }

      .input-group-lg
        > .input-group-append
        > select.btn:not([size]):not([multiple]),
      .input-group-lg
        > .input-group-append
        > select.input-group-text:not([size]):not([multiple]),
      .input-group-lg
        > .input-group-prepend
        > select.btn:not([size]):not([multiple]),
      .input-group-lg
        > .input-group-prepend
        > select.input-group-text:not([size]):not([multiple]),
      .input-group-lg > select.form-control:not([size]):not([multiple]),
      select.form-control-lg:not([size]):not([multiple]) {
        height: calc(2.875rem + 2px);
      }

      .form-group {
        margin-bottom: 1rem;
      }

      .form-text {
        display: block;
        margin-top: 0.25rem;
      }

      .form-row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -5px;
        margin-left: -5px;
      }

      .form-row > .col,
      .form-row > [class*="col-"] {
        padding-right: 5px;
        padding-left: 5px;
      }

      .form-check {
        position: relative;
        display: block;
        padding-left: 1.25rem;
      }

      .form-check-input {
        position: absolute;
        margin-top: 0.3rem;
        margin-left: -1.25rem;
      }

      .form-check-input:disabled ~ .form-check-label {
        color: #6c757d;
      }

      .form-check-label {
        margin-bottom: 0;
      }

      .form-check-inline {
        display: inline-flex;
        align-items: center;
        padding-left: 0;
        margin-right: 0.75rem;
      }

      .form-check-inline .form-check-input {
        position: static;
        margin-top: 0;
        margin-right: 0.3125rem;
        margin-left: 0;
      }

      .valid-feedback {
        display: none;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 80%;
        color: #28a745;
      }

      .valid-tooltip {
        position: absolute;
        top: 100%;
        z-index: 5;
        display: none;
        max-width: 100%;
        padding: 0.5rem;
        margin-top: 0.1rem;
        font-size: 0.875rem;
        line-height: 1;
        color: #fff;
        background-color: rgba(40, 167, 69, 0.8);
        border-radius: 0.2rem;
      }

      .custom-select.is-valid,
      .form-control.is-valid,
      .was-validated .custom-select:valid,
      .was-validated .form-control:valid {
        border-color: #28a745;
      }

      .custom-select.is-valid:focus,
      .form-control.is-valid:focus,
      .was-validated .custom-select:valid:focus,
      .was-validated .form-control:valid:focus {
        border-color: #28a745;
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
      }

      .custom-select.is-valid ~ .valid-feedback,
      .custom-select.is-valid ~ .valid-tooltip,
      .form-control-file.is-valid ~ .valid-feedback,
      .form-control-file.is-valid ~ .valid-tooltip,
      .form-control.is-valid ~ .valid-feedback,
      .form-control.is-valid ~ .valid-tooltip,
      .was-validated .custom-select:valid ~ .valid-feedback,
      .was-validated .custom-select:valid ~ .valid-tooltip,
      .was-validated .form-control-file:valid ~ .valid-feedback,
      .was-validated .form-control-file:valid ~ .valid-tooltip,
      .was-validated .form-control:valid ~ .valid-feedback,
      .was-validated .form-control:valid ~ .valid-tooltip {
        display: block;
      }

      .form-check-input.is-valid ~ .form-check-label,
      .was-validated .form-check-input:valid ~ .form-check-label {
        color: #28a745;
      }

      .form-check-input.is-valid ~ .valid-feedback,
      .form-check-input.is-valid ~ .valid-tooltip,
      .was-validated .form-check-input:valid ~ .valid-feedback,
      .was-validated .form-check-input:valid ~ .valid-tooltip {
        display: block;
      }

      .custom-control-input.is-valid ~ .custom-control-label,
      .was-validated .custom-control-input:valid ~ .custom-control-label {
        color: #28a745;
      }

      .custom-control-input.is-valid ~ .custom-control-label:before,
      .was-validated
        .custom-control-input:valid
        ~ .custom-control-label:before {
        background-color: #71dd8a;
      }

      .custom-control-input.is-valid ~ .valid-feedback,
      .custom-control-input.is-valid ~ .valid-tooltip,
      .was-validated .custom-control-input:valid ~ .valid-feedback,
      .was-validated .custom-control-input:valid ~ .valid-tooltip {
        display: block;
      }

      .custom-control-input.is-valid:checked ~ .custom-control-label:before,
      .was-validated
        .custom-control-input:valid:checked
        ~ .custom-control-label:before {
        background-color: #34ce57;
      }

      .custom-control-input.is-valid:focus ~ .custom-control-label:before,
      .was-validated
        .custom-control-input:valid:focus
        ~ .custom-control-label:before {
        box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
      }

      .custom-file-input.is-valid ~ .custom-file-label,
      .was-validated .custom-file-input:valid ~ .custom-file-label {
        border-color: #28a745;
      }

      .custom-file-input.is-valid ~ .custom-file-label:before,
      .was-validated .custom-file-input:valid ~ .custom-file-label:before {
        border-color: inherit;
      }

      .custom-file-input.is-valid ~ .valid-feedback,
      .custom-file-input.is-valid ~ .valid-tooltip,
      .was-validated .custom-file-input:valid ~ .valid-feedback,
      .was-validated .custom-file-input:valid ~ .valid-tooltip {
        display: block;
      }

      .custom-file-input.is-valid:focus ~ .custom-file-label,
      .was-validated .custom-file-input:valid:focus ~ .custom-file-label {
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
      }

      .invalid-feedback {
        display: none;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 80%;
        color: #f26f6d;
      }

      .invalid-tooltip {
        position: absolute;
        top: 100%;
        z-index: 5;
        display: none;
        max-width: 100%;
        padding: 0.5rem;
        margin-top: 0.1rem;
        font-size: 0.875rem;
        line-height: 1;
        color: #fff;
        background-color: hsla(1, 84%, 69%, 0.8);
        border-radius: 0.2rem;
      }

      .custom-select.is-invalid,
      .form-control.is-invalid,
      .was-validated .custom-select:invalid,
      .was-validated .form-control:invalid {
        border-color: #f26f6d;
      }

      .custom-select.is-invalid:focus,
      .form-control.is-invalid:focus,
      .was-validated .custom-select:invalid:focus,
      .was-validated .form-control:invalid:focus {
        border-color: #f26f6d;
        box-shadow: 0 0 0 0.2rem hsla(1, 84%, 69%, 0.25);
      }

      .custom-select.is-invalid ~ .invalid-feedback,
      .custom-select.is-invalid ~ .invalid-tooltip,
      .form-control-file.is-invalid ~ .invalid-feedback,
      .form-control-file.is-invalid ~ .invalid-tooltip,
      .form-control.is-invalid ~ .invalid-feedback,
      .form-control.is-invalid ~ .invalid-tooltip,
      .was-validated .custom-select:invalid ~ .invalid-feedback,
      .was-validated .custom-select:invalid ~ .invalid-tooltip,
      .was-validated .form-control-file:invalid ~ .invalid-feedback,
      .was-validated .form-control-file:invalid ~ .invalid-tooltip,
      .was-validated .form-control:invalid ~ .invalid-feedback,
      .was-validated .form-control:invalid ~ .invalid-tooltip {
        display: block;
      }

      .form-check-input.is-invalid ~ .form-check-label,
      .was-validated .form-check-input:invalid ~ .form-check-label {
        color: #f26f6d;
      }

      .form-check-input.is-invalid ~ .invalid-feedback,
      .form-check-input.is-invalid ~ .invalid-tooltip,
      .was-validated .form-check-input:invalid ~ .invalid-feedback,
      .was-validated .form-check-input:invalid ~ .invalid-tooltip {
        display: block;
      }

      .custom-control-input.is-invalid ~ .custom-control-label,
      .was-validated .custom-control-input:invalid ~ .custom-control-label {
        color: #f26f6d;
      }

      .custom-control-input.is-invalid ~ .custom-control-label:before,
      .was-validated
        .custom-control-input:invalid
        ~ .custom-control-label:before {
        background-color: #fce2e2;
      }

      .custom-control-input.is-invalid ~ .invalid-feedback,
      .custom-control-input.is-invalid ~ .invalid-tooltip,
      .was-validated .custom-control-input:invalid ~ .invalid-feedback,
      .was-validated .custom-control-input:invalid ~ .invalid-tooltip {
        display: block;
      }

      .custom-control-input.is-invalid:checked ~ .custom-control-label:before,
      .was-validated
        .custom-control-input:invalid:checked
        ~ .custom-control-label:before {
        background-color: #f69d9c;
      }

      .custom-control-input.is-invalid:focus ~ .custom-control-label:before,
      .was-validated
        .custom-control-input:invalid:focus
        ~ .custom-control-label:before {
        box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem hsla(1, 84%, 69%, 0.25);
      }

      .custom-file-input.is-invalid ~ .custom-file-label,
      .was-validated .custom-file-input:invalid ~ .custom-file-label {
        border-color: #f26f6d;
      }

      .custom-file-input.is-invalid ~ .custom-file-label:before,
      .was-validated .custom-file-input:invalid ~ .custom-file-label:before {
        border-color: inherit;
      }

      .custom-file-input.is-invalid ~ .invalid-feedback,
      .custom-file-input.is-invalid ~ .invalid-tooltip,
      .was-validated .custom-file-input:invalid ~ .invalid-feedback,
      .was-validated .custom-file-input:invalid ~ .invalid-tooltip {
        display: block;
      }

      .custom-file-input.is-invalid:focus ~ .custom-file-label,
      .was-validated .custom-file-input:invalid:focus ~ .custom-file-label {
        box-shadow: 0 0 0 0.2rem hsla(1, 84%, 69%, 0.25);
      }

      .form-inline {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
      }

      .form-inline .form-check {
        width: 100%;
      }

      @media (min-width: 576px) {
        .form-inline label {
          justify-content: center;
        }

        .form-inline .form-group,
        .form-inline label {
          display: flex;
          align-items: center;
          margin-bottom: 0;
        }

        .form-inline .form-group {
          flex: 0 0 auto;
          flex-flow: row wrap;
        }

        .form-inline .form-control {
          display: inline-block;
          width: auto;
          vertical-align: middle;
        }

        .form-inline .form-control-plaintext {
          display: inline-block;
        }

        .form-inline .custom-select,
        .form-inline .input-group {
          width: auto;
        }

        .form-inline .form-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: auto;
          padding-left: 0;
        }

        .form-inline .form-check-input {
          position: relative;
          margin-top: 0;
          margin-right: 0.25rem;
          margin-left: 0;
        }

        .form-inline .custom-control {
          align-items: center;
          justify-content: center;
        }

        .form-inline .custom-control-label {
          margin-bottom: 0;
        }
      }

      .btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .btn {
          transition: none;
        }
      }

      .btn:focus,
      .btn:hover {
        text-decoration: none;
      }

      .btn.focus,
      .btn:focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 175, 160, 0.25);
      }

      .btn.disabled,
      .btn:disabled {
        opacity: 0.65;
      }

      .btn:not(:disabled):not(.disabled) {
        cursor: pointer;
      }

      .btn:not(:disabled):not(.disabled).active,
      .btn:not(:disabled):not(.disabled):active {
        background-image: none;
      }

      a.btn.disabled,
      fieldset:disabled a.btn {
        pointer-events: none;
      }

      .btn-primary {
        color: #fff;
        background-color: #00afa0;
        border-color: #00afa0;
      }

      .btn-primary:hover {
        color: #fff;
        background-color: #00897d;
        border-color: #007c71;
      }

      .btn-primary.focus,
      .btn-primary:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 175, 160, 0.5);
      }

      .btn-primary.disabled,
      .btn-primary:disabled {
        color: #fff;
        background-color: #00afa0;
        border-color: #00afa0;
      }

      .btn-primary:not(:disabled):not(.disabled).active,
      .btn-primary:not(:disabled):not(.disabled):active,
      .show > .btn-primary.dropdown-toggle {
        color: #fff;
        background-color: #007c71;
        border-color: #006f66;
      }

      .btn-primary:not(:disabled):not(.disabled).active:focus,
      .btn-primary:not(:disabled):not(.disabled):active:focus,
      .show > .btn-primary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 175, 160, 0.5);
      }

      .btn-secondary {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
      }

      .btn-secondary:hover {
        color: #fff;
        background-color: #5a6268;
        border-color: #545b62;
      }

      .btn-secondary.focus,
      .btn-secondary:focus {
        box-shadow: 0 0 0 0.2rem hsla(208, 7%, 46%, 0.5);
      }

      .btn-secondary.disabled,
      .btn-secondary:disabled {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
      }

      .btn-secondary:not(:disabled):not(.disabled).active,
      .btn-secondary:not(:disabled):not(.disabled):active,
      .show > .btn-secondary.dropdown-toggle {
        color: #fff;
        background-color: #545b62;
        border-color: #4e555b;
      }

      .btn-secondary:not(:disabled):not(.disabled).active:focus,
      .btn-secondary:not(:disabled):not(.disabled):active:focus,
      .show > .btn-secondary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem hsla(208, 7%, 46%, 0.5);
      }

      .btn-success {
        color: #fff;
        background-color: #28a745;
        border-color: #28a745;
      }

      .btn-success:hover {
        color: #fff;
        background-color: #218838;
        border-color: #1e7e34;
      }

      .btn-success.focus,
      .btn-success:focus {
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
      }

      .btn-success.disabled,
      .btn-success:disabled {
        color: #fff;
        background-color: #28a745;
        border-color: #28a745;
      }

      .btn-success:not(:disabled):not(.disabled).active,
      .btn-success:not(:disabled):not(.disabled):active,
      .show > .btn-success.dropdown-toggle {
        color: #fff;
        background-color: #1e7e34;
        border-color: #1c7430;
      }

      .btn-success:not(:disabled):not(.disabled).active:focus,
      .btn-success:not(:disabled):not(.disabled):active:focus,
      .show > .btn-success.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
      }

      .btn-info {
        color: #fff;
        background-color: #17a2b8;
        border-color: #17a2b8;
      }

      .btn-info:hover {
        color: #fff;
        background-color: #138496;
        border-color: #117a8b;
      }

      .btn-info.focus,
      .btn-info:focus {
        box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
      }

      .btn-info.disabled,
      .btn-info:disabled {
        color: #fff;
        background-color: #17a2b8;
        border-color: #17a2b8;
      }

      .btn-info:not(:disabled):not(.disabled).active,
      .btn-info:not(:disabled):not(.disabled):active,
      .show > .btn-info.dropdown-toggle {
        color: #fff;
        background-color: #117a8b;
        border-color: #10707f;
      }

      .btn-info:not(:disabled):not(.disabled).active:focus,
      .btn-info:not(:disabled):not(.disabled):active:focus,
      .show > .btn-info.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
      }

      .btn-warning {
        color: #212529;
        background-color: #ffc107;
        border-color: #ffc107;
      }

      .btn-warning:hover {
        color: #212529;
        background-color: #e0a800;
        border-color: #d39e00;
      }

      .btn-warning.focus,
      .btn-warning:focus {
        box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
      }

      .btn-warning.disabled,
      .btn-warning:disabled {
        color: #212529;
        background-color: #ffc107;
        border-color: #ffc107;
      }

      .btn-warning:not(:disabled):not(.disabled).active,
      .btn-warning:not(:disabled):not(.disabled):active,
      .show > .btn-warning.dropdown-toggle {
        color: #212529;
        background-color: #d39e00;
        border-color: #c69500;
      }

      .btn-warning:not(:disabled):not(.disabled).active:focus,
      .btn-warning:not(:disabled):not(.disabled):active:focus,
      .show > .btn-warning.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
      }

      .btn-danger {
        color: #fff;
        background-color: #f26f6d;
        border-color: #f26f6d;
      }

      .btn-danger:hover {
        color: #fff;
        background-color: #ef4c4a;
        border-color: #ee413e;
      }

      .btn-danger.focus,
      .btn-danger:focus {
        box-shadow: 0 0 0 0.2rem hsla(1, 84%, 69%, 0.5);
      }

      .btn-danger.disabled,
      .btn-danger:disabled {
        color: #fff;
        background-color: #f26f6d;
        border-color: #f26f6d;
      }

      .btn-danger:not(:disabled):not(.disabled).active,
      .btn-danger:not(:disabled):not(.disabled):active,
      .show > .btn-danger.dropdown-toggle {
        color: #fff;
        background-color: #ee413e;
        border-color: #ed3532;
      }

      .btn-danger:not(:disabled):not(.disabled).active:focus,
      .btn-danger:not(:disabled):not(.disabled):active:focus,
      .show > .btn-danger.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem hsla(1, 84%, 69%, 0.5);
      }

      .btn-light {
        color: #212529;
        background-color: #f8f9fa;
        border-color: #f8f9fa;
      }

      .btn-light:hover {
        color: #212529;
        background-color: #e2e6ea;
        border-color: #dae0e5;
      }

      .btn-light.focus,
      .btn-light:focus {
        box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
      }

      .btn-light.disabled,
      .btn-light:disabled {
        color: #212529;
        background-color: #f8f9fa;
        border-color: #f8f9fa;
      }

      .btn-light:not(:disabled):not(.disabled).active,
      .btn-light:not(:disabled):not(.disabled):active,
      .show > .btn-light.dropdown-toggle {
        color: #212529;
        background-color: #dae0e5;
        border-color: #d3d9df;
      }

      .btn-light:not(:disabled):not(.disabled).active:focus,
      .btn-light:not(:disabled):not(.disabled):active:focus,
      .show > .btn-light.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
      }

      .btn-dark {
        color: #fff;
        background-color: #333;
        border-color: #333;
      }

      .btn-dark:hover {
        color: #fff;
        background-color: #202020;
        border-color: #1a1a1a;
      }

      .btn-dark.focus,
      .btn-dark:focus {
        box-shadow: 0 0 0 0.2rem rgba(51, 51, 51, 0.5);
      }

      .btn-dark.disabled,
      .btn-dark:disabled {
        color: #fff;
        background-color: #333;
        border-color: #333;
      }

      .btn-dark:not(:disabled):not(.disabled).active,
      .btn-dark:not(:disabled):not(.disabled):active,
      .show > .btn-dark.dropdown-toggle {
        color: #fff;
        background-color: #1a1a1a;
        border-color: #131313;
      }

      .btn-dark:not(:disabled):not(.disabled).active:focus,
      .btn-dark:not(:disabled):not(.disabled):active:focus,
      .show > .btn-dark.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(51, 51, 51, 0.5);
      }

      .btn-dark-gray {
        color: #212529;
        background-color: #9b9b9b;
        border-color: #9b9b9b;
      }

      .btn-dark-gray:hover {
        color: #fff;
        background-color: #888;
        border-color: #828282;
      }

      .btn-dark-gray.focus,
      .btn-dark-gray:focus {
        box-shadow: 0 0 0 0.2rem hsla(0, 0%, 61%, 0.5);
      }

      .btn-dark-gray.disabled,
      .btn-dark-gray:disabled {
        color: #212529;
        background-color: #9b9b9b;
        border-color: #9b9b9b;
      }

      .btn-dark-gray:not(:disabled):not(.disabled).active,
      .btn-dark-gray:not(:disabled):not(.disabled):active,
      .show > .btn-dark-gray.dropdown-toggle {
        color: #fff;
        background-color: #828282;
        border-color: #7b7b7b;
      }

      .btn-dark-gray:not(:disabled):not(.disabled).active:focus,
      .btn-dark-gray:not(:disabled):not(.disabled):active:focus,
      .show > .btn-dark-gray.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem hsla(0, 0%, 61%, 0.5);
      }

      .btn-outline-primary {
        color: #00afa0;
        background-color: transparent;
        background-image: none;
        border-color: #00afa0;
      }

      .btn-outline-primary:hover {
        color: #fff;
        background-color: #00afa0;
        border-color: #00afa0;
      }

      .btn-outline-primary.focus,
      .btn-outline-primary:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 175, 160, 0.5);
      }

      .btn-outline-primary.disabled,
      .btn-outline-primary:disabled {
        color: #00afa0;
        background-color: transparent;
      }

      .btn-outline-primary:not(:disabled):not(.disabled).active,
      .btn-outline-primary:not(:disabled):not(.disabled):active,
      .show > .btn-outline-primary.dropdown-toggle {
        color: #fff;
        background-color: #00afa0;
        border-color: #00afa0;
      }

      .btn-outline-primary:not(:disabled):not(.disabled).active:focus,
      .btn-outline-primary:not(:disabled):not(.disabled):active:focus,
      .show > .btn-outline-primary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 175, 160, 0.5);
      }

      .btn-outline-secondary {
        color: #6c757d;
        background-color: transparent;
        background-image: none;
        border-color: #6c757d;
      }

      .btn-outline-secondary:hover {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
      }

      .btn-outline-secondary.focus,
      .btn-outline-secondary:focus {
        box-shadow: 0 0 0 0.2rem hsla(208, 7%, 46%, 0.5);
      }

      .btn-outline-secondary.disabled,
      .btn-outline-secondary:disabled {
        color: #6c757d;
        background-color: transparent;
      }

      .btn-outline-secondary:not(:disabled):not(.disabled).active,
      .btn-outline-secondary:not(:disabled):not(.disabled):active,
      .show > .btn-outline-secondary.dropdown-toggle {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
      }

      .btn-outline-secondary:not(:disabled):not(.disabled).active:focus,
      .btn-outline-secondary:not(:disabled):not(.disabled):active:focus,
      .show > .btn-outline-secondary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem hsla(208, 7%, 46%, 0.5);
      }

      .btn-outline-success {
        color: #28a745;
        background-color: transparent;
        background-image: none;
        border-color: #28a745;
      }

      .btn-outline-success:hover {
        color: #fff;
        background-color: #28a745;
        border-color: #28a745;
      }

      .btn-outline-success.focus,
      .btn-outline-success:focus {
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
      }

      .btn-outline-success.disabled,
      .btn-outline-success:disabled {
        color: #28a745;
        background-color: transparent;
      }

      .btn-outline-success:not(:disabled):not(.disabled).active,
      .btn-outline-success:not(:disabled):not(.disabled):active,
      .show > .btn-outline-success.dropdown-toggle {
        color: #fff;
        background-color: #28a745;
        border-color: #28a745;
      }

      .btn-outline-success:not(:disabled):not(.disabled).active:focus,
      .btn-outline-success:not(:disabled):not(.disabled):active:focus,
      .show > .btn-outline-success.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
      }

      .btn-outline-info {
        color: #17a2b8;
        background-color: transparent;
        background-image: none;
        border-color: #17a2b8;
      }

      .btn-outline-info:hover {
        color: #fff;
        background-color: #17a2b8;
        border-color: #17a2b8;
      }

      .btn-outline-info.focus,
      .btn-outline-info:focus {
        box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
      }

      .btn-outline-info.disabled,
      .btn-outline-info:disabled {
        color: #17a2b8;
        background-color: transparent;
      }

      .btn-outline-info:not(:disabled):not(.disabled).active,
      .btn-outline-info:not(:disabled):not(.disabled):active,
      .show > .btn-outline-info.dropdown-toggle {
        color: #fff;
        background-color: #17a2b8;
        border-color: #17a2b8;
      }

      .btn-outline-info:not(:disabled):not(.disabled).active:focus,
      .btn-outline-info:not(:disabled):not(.disabled):active:focus,
      .show > .btn-outline-info.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
      }

      .btn-outline-warning {
        color: #ffc107;
        background-color: transparent;
        background-image: none;
        border-color: #ffc107;
      }

      .btn-outline-warning:hover {
        color: #212529;
        background-color: #ffc107;
        border-color: #ffc107;
      }

      .btn-outline-warning.focus,
      .btn-outline-warning:focus {
        box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
      }

      .btn-outline-warning.disabled,
      .btn-outline-warning:disabled {
        color: #ffc107;
        background-color: transparent;
      }

      .btn-outline-warning:not(:disabled):not(.disabled).active,
      .btn-outline-warning:not(:disabled):not(.disabled):active,
      .show > .btn-outline-warning.dropdown-toggle {
        color: #212529;
        background-color: #ffc107;
        border-color: #ffc107;
      }

      .btn-outline-warning:not(:disabled):not(.disabled).active:focus,
      .btn-outline-warning:not(:disabled):not(.disabled):active:focus,
      .show > .btn-outline-warning.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
      }

      .btn-outline-danger {
        color: #f26f6d;
        background-color: transparent;
        background-image: none;
        border-color: #f26f6d;
      }

      .btn-outline-danger:hover {
        color: #fff;
        background-color: #f26f6d;
        border-color: #f26f6d;
      }

      .btn-outline-danger.focus,
      .btn-outline-danger:focus {
        box-shadow: 0 0 0 0.2rem hsla(1, 84%, 69%, 0.5);
      }

      .btn-outline-danger.disabled,
      .btn-outline-danger:disabled {
        color: #f26f6d;
        background-color: transparent;
      }

      .btn-outline-danger:not(:disabled):not(.disabled).active,
      .btn-outline-danger:not(:disabled):not(.disabled):active,
      .show > .btn-outline-danger.dropdown-toggle {
        color: #fff;
        background-color: #f26f6d;
        border-color: #f26f6d;
      }

      .btn-outline-danger:not(:disabled):not(.disabled).active:focus,
      .btn-outline-danger:not(:disabled):not(.disabled):active:focus,
      .show > .btn-outline-danger.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem hsla(1, 84%, 69%, 0.5);
      }

      .btn-outline-light {
        color: #f8f9fa;
        background-color: transparent;
        background-image: none;
        border-color: #f8f9fa;
      }

      .btn-outline-light:hover {
        color: #212529;
        background-color: #f8f9fa;
        border-color: #f8f9fa;
      }

      .btn-outline-light.focus,
      .btn-outline-light:focus {
        box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
      }

      .btn-outline-light.disabled,
      .btn-outline-light:disabled {
        color: #f8f9fa;
        background-color: transparent;
      }

      .btn-outline-light:not(:disabled):not(.disabled).active,
      .btn-outline-light:not(:disabled):not(.disabled):active,
      .show > .btn-outline-light.dropdown-toggle {
        color: #212529;
        background-color: #f8f9fa;
        border-color: #f8f9fa;
      }

      .btn-outline-light:not(:disabled):not(.disabled).active:focus,
      .btn-outline-light:not(:disabled):not(.disabled):active:focus,
      .show > .btn-outline-light.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
      }

      .btn-outline-dark {
        color: #333;
        background-color: transparent;
        background-image: none;
        border-color: #333;
      }

      .btn-outline-dark:hover {
        color: #fff;
        background-color: #333;
        border-color: #333;
      }

      .btn-outline-dark.focus,
      .btn-outline-dark:focus {
        box-shadow: 0 0 0 0.2rem rgba(51, 51, 51, 0.5);
      }

      .btn-outline-dark.disabled,
      .btn-outline-dark:disabled {
        color: #333;
        background-color: transparent;
      }

      .btn-outline-dark:not(:disabled):not(.disabled).active,
      .btn-outline-dark:not(:disabled):not(.disabled):active,
      .show > .btn-outline-dark.dropdown-toggle {
        color: #fff;
        background-color: #333;
        border-color: #333;
      }

      .btn-outline-dark:not(:disabled):not(.disabled).active:focus,
      .btn-outline-dark:not(:disabled):not(.disabled):active:focus,
      .show > .btn-outline-dark.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgba(51, 51, 51, 0.5);
      }

      .btn-outline-dark-gray {
        color: #9b9b9b;
        background-color: transparent;
        background-image: none;
        border-color: #9b9b9b;
      }

      .btn-outline-dark-gray:hover {
        color: #212529;
        background-color: #9b9b9b;
        border-color: #9b9b9b;
      }

      .btn-outline-dark-gray.focus,
      .btn-outline-dark-gray:focus {
        box-shadow: 0 0 0 0.2rem hsla(0, 0%, 61%, 0.5);
      }

      .btn-outline-dark-gray.disabled,
      .btn-outline-dark-gray:disabled {
        color: #9b9b9b;
        background-color: transparent;
      }

      .btn-outline-dark-gray:not(:disabled):not(.disabled).active,
      .btn-outline-dark-gray:not(:disabled):not(.disabled):active,
      .show > .btn-outline-dark-gray.dropdown-toggle {
        color: #212529;
        background-color: #9b9b9b;
        border-color: #9b9b9b;
      }

      .btn-outline-dark-gray:not(:disabled):not(.disabled).active:focus,
      .btn-outline-dark-gray:not(:disabled):not(.disabled):active:focus,
      .show > .btn-outline-dark-gray.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem hsla(0, 0%, 61%, 0.5);
      }

      .btn-link {
        font-weight: 400;
        color: #00afa0;
        background-color: transparent;
      }

      .btn-link:hover {
        color: #00635a;
        background-color: transparent;
      }

      .btn-link.focus,
      .btn-link:focus,
      .btn-link:hover {
        text-decoration: underline;
        border-color: transparent;
      }

      .btn-link.focus,
      .btn-link:focus {
        box-shadow: none;
      }

      .btn-link.disabled,
      .btn-link:disabled {
        color: #6c757d;
        pointer-events: none;
      }

      .btn-group-lg > .btn,
      .btn-lg {
        padding: 0.5rem 1rem;
        font-size: 1.25rem;
        line-height: 1.5;
        border-radius: 0.3rem;
      }

      .btn-group-sm > .btn,
      .btn-sm {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.2rem;
      }

      .btn-block {
        display: block;
        width: 100%;
      }

      .btn-block + .btn-block {
        margin-top: 0.5rem;
      }

      input[type="button"].btn-block,
      input[type="reset"].btn-block,
      input[type="submit"].btn-block {
        width: 100%;
      }

      .fade {
        transition: opacity 0.15s linear;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .fade {
          transition: none;
        }
      }

      .fade:not(.show) {
        opacity: 0;
      }

      .collapse:not(.show) {
        display: none;
      }

      .collapsing {
        position: relative;
        height: 0;
        overflow: hidden;
        transition: height 0.35s ease;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .collapsing {
          transition: none;
        }
      }

      .dropdown,
      .dropleft,
      .dropright,
      .dropup {
        position: relative;
      }

      .dropdown-toggle:after {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 0.255em;
        vertical-align: 0.255em;
        content: "";
        border-top: 0.3em solid;
        border-right: 0.3em solid transparent;
        border-bottom: 0;
        border-left: 0.3em solid transparent;
      }

      .dropdown-toggle:empty:after {
        margin-left: 0;
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        display: none;
        float: left;
        min-width: 10rem;
        padding: 0.5rem 0;
        margin: 0.125rem 0 0;
        font-size: 1rem;
        color: #212529;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 0.25rem;
      }

      .dropdown-menu-right {
        right: 0;
        left: auto;
      }

      .dropup .dropdown-menu {
        top: auto;
        bottom: 100%;
        margin-top: 0;
        margin-bottom: 0.125rem;
      }

      .dropup .dropdown-toggle:after {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 0.255em;
        vertical-align: 0.255em;
        content: "";
        border-top: 0;
        border-right: 0.3em solid transparent;
        border-bottom: 0.3em solid;
        border-left: 0.3em solid transparent;
      }

      .dropup .dropdown-toggle:empty:after {
        margin-left: 0;
      }

      .dropright .dropdown-menu {
        top: 0;
        right: auto;
        left: 100%;
        margin-top: 0;
        margin-left: 0.125rem;
      }

      .dropright .dropdown-toggle:after {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 0.255em;
        vertical-align: 0.255em;
        content: "";
        border-top: 0.3em solid transparent;
        border-right: 0;
        border-bottom: 0.3em solid transparent;
        border-left: 0.3em solid;
      }

      .dropright .dropdown-toggle:empty:after {
        margin-left: 0;
      }

      .dropright .dropdown-toggle:after {
        vertical-align: 0;
      }

      .dropleft .dropdown-menu {
        top: 0;
        right: 100%;
        left: auto;
        margin-top: 0;
        margin-right: 0.125rem;
      }

      .dropleft .dropdown-toggle:after {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 0.255em;
        vertical-align: 0.255em;
        content: "";
        display: none;
      }

      .dropleft .dropdown-toggle:before {
        display: inline-block;
        width: 0;
        height: 0;
        margin-right: 0.255em;
        vertical-align: 0.255em;
        content: "";
        border-top: 0.3em solid transparent;
        border-right: 0.3em solid;
        border-bottom: 0.3em solid transparent;
      }

      .dropleft .dropdown-toggle:empty:after {
        margin-left: 0;
      }

      .dropleft .dropdown-toggle:before {
        vertical-align: 0;
      }

      .dropdown-menu[x-placement^="bottom"],
      .dropdown-menu[x-placement^="left"],
      .dropdown-menu[x-placement^="right"],
      .dropdown-menu[x-placement^="top"] {
        right: auto;
        bottom: auto;
      }

      .dropdown-divider {
        height: 0;
        margin: 0.5rem 0;
        overflow: hidden;
        border-top: 1px solid #e9ecef;
      }

      .dropdown-item {
        display: block;
        width: 100%;
        padding: 0.25rem 1.5rem;
        clear: both;
        font-weight: 400;
        color: #212529;
        text-align: inherit;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
      }

      .dropdown-item:focus,
      .dropdown-item:hover {
        color: #16181b;
        text-decoration: none;
        background-color: #f8f9fa;
      }

      .dropdown-item.active,
      .dropdown-item:active {
        color: #fff;
        text-decoration: none;
        background-color: #00afa0;
      }

      .dropdown-item.disabled,
      .dropdown-item:disabled {
        color: #6c757d;
        background-color: transparent;
      }

      .dropdown-menu.show {
        display: block;
      }

      .dropdown-header {
        display: block;
        padding: 0.5rem 1.5rem;
        margin-bottom: 0;
        font-size: 0.875rem;
        color: #6c757d;
        white-space: nowrap;
      }

      .dropdown-item-text {
        display: block;
        padding: 0.25rem 1.5rem;
        color: #212529;
      }

      .btn-group,
      .btn-group-vertical {
        position: relative;
        display: inline-flex;
        vertical-align: middle;
      }

      .btn-group-vertical > .btn,
      .btn-group > .btn {
        position: relative;
        flex: 0 1 auto;
      }

      .btn-group-vertical > .btn.active,
      .btn-group-vertical > .btn:active,
      .btn-group-vertical > .btn:focus,
      .btn-group-vertical > .btn:hover,
      .btn-group > .btn.active,
      .btn-group > .btn:active,
      .btn-group > .btn:focus,
      .btn-group > .btn:hover {
        z-index: 1;
      }

      .btn-group-vertical .btn + .btn,
      .btn-group-vertical .btn + .btn-group,
      .btn-group-vertical .btn-group + .btn,
      .btn-group-vertical .btn-group + .btn-group,
      .btn-group .btn + .btn,
      .btn-group .btn + .btn-group,
      .btn-group .btn-group + .btn,
      .btn-group .btn-group + .btn-group {
        margin-left: -1px;
      }

      .btn-toolbar {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .btn-toolbar .input-group {
        width: auto;
      }

      .btn-group > .btn:first-child {
        margin-left: 0;
      }

      .btn-group > .btn-group:not(:last-child) > .btn,
      .btn-group > .btn:not(:last-child):not(.dropdown-toggle) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .btn-group > .btn-group:not(:first-child) > .btn,
      .btn-group > .btn:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .dropdown-toggle-split {
        padding-right: 0.5625rem;
        padding-left: 0.5625rem;
      }

      .dropdown-toggle-split:after,
      .dropright .dropdown-toggle-split:after,
      .dropup .dropdown-toggle-split:after {
        margin-left: 0;
      }

      .dropleft .dropdown-toggle-split:before {
        margin-right: 0;
      }

      .btn-group-sm > .btn + .dropdown-toggle-split,
      .btn-sm + .dropdown-toggle-split {
        padding-right: 0.375rem;
        padding-left: 0.375rem;
      }

      .btn-group-lg > .btn + .dropdown-toggle-split,
      .btn-lg + .dropdown-toggle-split {
        padding-right: 0.75rem;
        padding-left: 0.75rem;
      }

      .btn-group-vertical {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }

      .btn-group-vertical .btn,
      .btn-group-vertical .btn-group {
        width: 100%;
      }

      .btn-group-vertical > .btn + .btn,
      .btn-group-vertical > .btn + .btn-group,
      .btn-group-vertical > .btn-group + .btn,
      .btn-group-vertical > .btn-group + .btn-group {
        margin-top: -1px;
        margin-left: 0;
      }

      .btn-group-vertical > .btn-group:not(:last-child) > .btn,
      .btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle) {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }

      .btn-group-vertical > .btn-group:not(:first-child) > .btn,
      .btn-group-vertical > .btn:not(:first-child) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }

      .btn-group-toggle > .btn,
      .btn-group-toggle > .btn-group > .btn {
        margin-bottom: 0;
      }

      .btn-group-toggle > .btn-group > .btn input[type="checkbox"],
      .btn-group-toggle > .btn-group > .btn input[type="radio"],
      .btn-group-toggle > .btn input[type="checkbox"],
      .btn-group-toggle > .btn input[type="radio"] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
        pointer-events: none;
      }

      .input-group {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        width: 100%;
      }

      .input-group > .custom-file,
      .input-group > .custom-select,
      .input-group > .form-control {
        position: relative;
        flex: 1 1 auto;
        width: 1%;
        margin-bottom: 0;
      }

      .input-group > .custom-file + .custom-file,
      .input-group > .custom-file + .custom-select,
      .input-group > .custom-file + .form-control,
      .input-group > .custom-select + .custom-file,
      .input-group > .custom-select + .custom-select,
      .input-group > .custom-select + .form-control,
      .input-group > .form-control + .custom-file,
      .input-group > .form-control + .custom-select,
      .input-group > .form-control + .form-control {
        margin-left: -1px;
      }

      .input-group > .custom-file .custom-file-input:focus ~ .custom-file-label,
      .input-group > .custom-select:focus,
      .input-group > .form-control:focus {
        z-index: 3;
      }

      .input-group > .custom-select:not(:last-child),
      .input-group > .form-control:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .input-group > .custom-select:not(:first-child),
      .input-group > .form-control:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .input-group > .custom-file {
        display: flex;
        align-items: center;
      }

      .input-group > .custom-file:not(:last-child) .custom-file-label,
      .input-group > .custom-file:not(:last-child) .custom-file-label:after {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .input-group > .custom-file:not(:first-child) .custom-file-label {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .input-group-append,
      .input-group-prepend {
        display: flex;
      }

      .input-group-append .btn,
      .input-group-prepend .btn {
        position: relative;
        z-index: 2;
      }

      .input-group-append .btn + .btn,
      .input-group-append .btn + .input-group-text,
      .input-group-append .input-group-text + .btn,
      .input-group-append .input-group-text + .input-group-text,
      .input-group-prepend .btn + .btn,
      .input-group-prepend .btn + .input-group-text,
      .input-group-prepend .input-group-text + .btn,
      .input-group-prepend .input-group-text + .input-group-text {
        margin-left: -1px;
      }

      .input-group-prepend {
        margin-right: -1px;
      }

      .input-group-append {
        margin-left: -1px;
      }

      .input-group-text {
        display: flex;
        align-items: center;
        padding: 0.375rem 0.75rem;
        margin-bottom: 0;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        text-align: center;
        white-space: nowrap;
        background-color: #e9ecef;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
      }

      .input-group-text input[type="checkbox"],
      .input-group-text input[type="radio"] {
        margin-top: 0;
      }

      .input-group
        > .input-group-append:last-child
        > .btn:not(:last-child):not(.dropdown-toggle),
      .input-group
        > .input-group-append:last-child
        > .input-group-text:not(:last-child),
      .input-group > .input-group-append:not(:last-child) > .btn,
      .input-group > .input-group-append:not(:last-child) > .input-group-text,
      .input-group > .input-group-prepend > .btn,
      .input-group > .input-group-prepend > .input-group-text {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .input-group > .input-group-append > .btn,
      .input-group > .input-group-append > .input-group-text,
      .input-group > .input-group-prepend:first-child > .btn:not(:first-child),
      .input-group
        > .input-group-prepend:first-child
        > .input-group-text:not(:first-child),
      .input-group > .input-group-prepend:not(:first-child) > .btn,
      .input-group
        > .input-group-prepend:not(:first-child)
        > .input-group-text {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .custom-control {
        position: relative;
        display: block;
        min-height: 1.5rem;
        padding-left: 1.5rem;
      }

      .custom-control-inline {
        display: inline-flex;
        margin-right: 1rem;
      }

      .custom-control-input {
        position: absolute;
        z-index: -1;
        opacity: 0;
      }

      .custom-control-input:checked ~ .custom-control-label:before {
        color: #fff;
        background-color: #00afa0;
      }

      .custom-control-input:focus ~ .custom-control-label:before {
        box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 175, 160, 0.25);
      }

      .custom-control-input:active ~ .custom-control-label:before {
        color: #fff;
        background-color: #63fff2;
      }

      .custom-control-input:disabled ~ .custom-control-label {
        color: #6c757d;
      }

      .custom-control-input:disabled ~ .custom-control-label:before {
        background-color: #e9ecef;
      }

      .custom-control-label {
        position: relative;
        margin-bottom: 0;
      }

      .custom-control-label:before {
        pointer-events: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: #dee2e6;
      }

      .custom-control-label:after,
      .custom-control-label:before {
        position: absolute;
        top: 0.25rem;
        left: -1.5rem;
        display: block;
        width: 1rem;
        height: 1rem;
        content: "";
      }

      .custom-control-label:after {
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 50% 50%;
      }

      .custom-checkbox .custom-control-label:before {
        border-radius: 0.25rem;
      }

      .custom-checkbox
        .custom-control-input:checked
        ~ .custom-control-label:before {
        background-color: #00afa0;
      }

      .custom-checkbox
        .custom-control-input:checked
        ~ .custom-control-label:after {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
      }

      .custom-checkbox
        .custom-control-input:indeterminate
        ~ .custom-control-label:before {
        background-color: #00afa0;
      }

      .custom-checkbox
        .custom-control-input:indeterminate
        ~ .custom-control-label:after {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E");
      }

      .custom-checkbox
        .custom-control-input:disabled:checked
        ~ .custom-control-label:before {
        background-color: rgba(0, 175, 160, 0.5);
      }

      .custom-checkbox
        .custom-control-input:disabled:indeterminate
        ~ .custom-control-label:before {
        background-color: rgba(0, 175, 160, 0.5);
      }

      .custom-radio .custom-control-label:before {
        border-radius: 50%;
      }

      .custom-radio
        .custom-control-input:checked
        ~ .custom-control-label:before {
        background-color: #00afa0;
      }

      .custom-radio
        .custom-control-input:checked
        ~ .custom-control-label:after {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E");
      }

      .custom-radio
        .custom-control-input:disabled:checked
        ~ .custom-control-label:before {
        background-color: rgba(0, 175, 160, 0.5);
      }

      .custom-select {
        display: inline-block;
        width: 100%;
        height: calc(2.25rem + 2px);
        padding: 0.375rem 1.75rem 0.375rem 0.75rem;
        line-height: 1.5;
        color: #495057;
        vertical-align: middle;
        background: #fff
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
          no-repeat right 0.75rem center;
        background-size: 8px 10px;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .custom-select:focus {
        border-color: #30ffed;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(48, 255, 237, 0.5);
      }

      .custom-select:focus::-ms-value {
        color: #495057;
        background-color: #fff;
      }

      .custom-select[multiple],
      .custom-select[size]:not([size="1"]) {
        height: auto;
        padding-right: 0.75rem;
        background-image: none;
      }

      .custom-select:disabled {
        color: #6c757d;
        background-color: #e9ecef;
      }

      .custom-select::-ms-expand {
        opacity: 0;
      }

      .custom-select-sm {
        height: calc(1.8125rem + 2px);
        font-size: 75%;
      }

      .custom-select-lg,
      .custom-select-sm {
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
      }

      .custom-select-lg {
        height: calc(2.875rem + 2px);
        font-size: 125%;
      }

      .custom-file {
        display: inline-block;
        margin-bottom: 0;
      }

      .custom-file,
      .custom-file-input {
        position: relative;
        width: 100%;
        height: calc(2.25rem + 2px);
      }

      .custom-file-input {
        z-index: 2;
        margin: 0;
        opacity: 0;
      }

      .custom-file-input:focus ~ .custom-file-label {
        border-color: #30ffed;
        box-shadow: 0 0 0 0.2rem rgba(0, 175, 160, 0.25);
      }

      .custom-file-input:focus ~ .custom-file-label:after {
        border-color: #30ffed;
      }

      .custom-file-input:disabled ~ .custom-file-label {
        background-color: #e9ecef;
      }

      .custom-file-input:lang(en) ~ .custom-file-label:after {
        content: "Browse";
      }

      .custom-file-label {
        left: 0;
        z-index: 1;
        height: calc(2.25rem + 2px);
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
      }

      .custom-file-label,
      .custom-file-label:after {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.375rem 0.75rem;
        line-height: 1.5;
        color: #495057;
      }

      .custom-file-label:after {
        bottom: 0;
        z-index: 3;
        display: block;
        height: 2.25rem;
        content: "Browse";
        background-color: #e9ecef;
        border-left: 1px solid #ced4da;
        border-radius: 0 0.25rem 0.25rem 0;
      }

      .custom-range {
        width: 100%;
        padding-left: 0;
        background-color: transparent;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .custom-range:focus {
        outline: none;
      }

      .custom-range::-moz-focus-outer {
        border: 0;
      }

      .custom-range::-webkit-slider-thumb {
        width: 1rem;
        height: 1rem;
        margin-top: -0.25rem;
        background-color: #00afa0;
        border: 0;
        border-radius: 1rem;
        transition: background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        -webkit-appearance: none;
        appearance: none;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .custom-range::-webkit-slider-thumb {
          transition: none;
        }
      }

      .custom-range::-webkit-slider-thumb:focus {
        outline: none;
        box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 175, 160, 0.25);
      }

      .custom-range::-webkit-slider-thumb:active {
        background-color: #63fff2;
      }

      .custom-range::-webkit-slider-runnable-track {
        width: 100%;
        height: 0.5rem;
        color: transparent;
        cursor: pointer;
        background-color: #dee2e6;
        border-color: transparent;
        border-radius: 1rem;
      }

      .custom-range::-moz-range-thumb {
        width: 1rem;
        height: 1rem;
        background-color: #00afa0;
        border: 0;
        border-radius: 1rem;
        transition: background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        -moz-appearance: none;
        appearance: none;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .custom-range::-moz-range-thumb {
          transition: none;
        }
      }

      .custom-range::-moz-range-thumb:focus {
        outline: none;
        box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 175, 160, 0.25);
      }

      .custom-range::-moz-range-thumb:active {
        background-color: #63fff2;
      }

      .custom-range::-moz-range-track {
        width: 100%;
        height: 0.5rem;
        color: transparent;
        cursor: pointer;
        background-color: #dee2e6;
        border-color: transparent;
        border-radius: 1rem;
      }

      .custom-range::-ms-thumb {
        width: 1rem;
        height: 1rem;
        background-color: #00afa0;
        border: 0;
        border-radius: 1rem;
        transition: background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        appearance: none;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .custom-range::-ms-thumb {
          transition: none;
        }
      }

      .custom-range::-ms-thumb:focus {
        outline: none;
        box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 175, 160, 0.25);
      }

      .custom-range::-ms-thumb:active {
        background-color: #63fff2;
      }

      .custom-range::-ms-track {
        width: 100%;
        height: 0.5rem;
        color: transparent;
        cursor: pointer;
        background-color: transparent;
        border-color: transparent;
        border-width: 0.5rem;
      }

      .custom-range::-ms-fill-lower,
      .custom-range::-ms-fill-upper {
        background-color: #dee2e6;
        border-radius: 1rem;
      }

      .custom-range::-ms-fill-upper {
        margin-right: 15px;
      }

      .custom-control-label:before,
      .custom-file-label,
      .custom-select {
        transition: background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .custom-control-label:before,
        .custom-file-label,
        .custom-select {
          transition: none;
        }
      }

      .nav {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
      }

      .nav-link {
        display: block;
        padding: 0.5rem 1rem;
      }

      .nav-link:focus,
      .nav-link:hover {
        text-decoration: none;
      }

      .nav-link.disabled {
        color: #6c757d;
      }

      .nav-tabs {
        border-bottom: 1px solid #dee2e6;
      }

      .nav-tabs .nav-item {
        margin-bottom: -1px;
      }

      .nav-tabs .nav-link {
        border: 1px solid transparent;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
      }

      .nav-tabs .nav-link:focus,
      .nav-tabs .nav-link:hover {
        border-color: #e9ecef #e9ecef #dee2e6;
      }

      .nav-tabs .nav-link.disabled {
        color: #6c757d;
        background-color: transparent;
        border-color: transparent;
      }

      .nav-tabs .nav-item.show .nav-link,
      .nav-tabs .nav-link.active {
        color: #495057;
        background-color: #fff;
        border-color: #dee2e6 #dee2e6 #fff;
      }

      .nav-tabs .dropdown-menu {
        margin-top: -1px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }

      .nav-pills .nav-link {
        border-radius: 0.25rem;
      }

      .nav-pills .nav-link.active,
      .nav-pills .show > .nav-link {
        color: #fff;
        background-color: #00afa0;
      }

      .nav-fill .nav-item {
        flex: 1 1 auto;
        text-align: center;
      }

      .nav-justified .nav-item {
        flex-basis: 0;
        flex-grow: 1;
        text-align: center;
      }

      .tab-content > .tab-pane {
        display: none;
      }

      .tab-content > .active {
        display: block;
      }

      .navbar {
        position: relative;
        padding: 0.5rem 1rem;
      }

      .navbar,
      .navbar > .container,
      .navbar > .container-fluid {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }

      .navbar-brand {
        display: inline-block;
        padding-top: 0.3125rem;
        padding-bottom: 0.3125rem;
        margin-right: 1rem;
        font-size: 1.25rem;
        line-height: inherit;
        white-space: nowrap;
      }

      .navbar-brand:focus,
      .navbar-brand:hover {
        text-decoration: none;
      }

      .navbar-nav {
        display: flex;
        flex-direction: column;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
      }

      .navbar-nav .nav-link {
        padding-right: 0;
        padding-left: 0;
      }

      .navbar-nav .dropdown-menu {
        position: static;
        float: none;
      }

      .navbar-text {
        display: inline-block;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }

      .navbar-collapse {
        flex-basis: 100%;
        flex-grow: 1;
        align-items: center;
      }

      .navbar-toggler {
        padding: 0.25rem 0.75rem;
        font-size: 1.25rem;
        line-height: 1;
        background-color: transparent;
        border: 1px solid transparent;
        border-radius: 0.25rem;
      }

      .navbar-toggler:focus,
      .navbar-toggler:hover {
        text-decoration: none;
      }

      .navbar-toggler:not(:disabled):not(.disabled) {
        cursor: pointer;
      }

      .navbar-toggler-icon {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        vertical-align: middle;
        content: "";
        background: no-repeat 50%;
        background-size: 100% 100%;
      }

      @media (max-width: 575.98px) {
        .navbar-expand-sm > .container,
        .navbar-expand-sm > .container-fluid {
          padding-right: 0;
          padding-left: 0;
        }
      }

      @media (min-width: 576px) {
        .navbar-expand-sm {
          flex-flow: row nowrap;
          justify-content: flex-start;
        }

        .navbar-expand-sm .navbar-nav {
          flex-direction: row;
        }

        .navbar-expand-sm .navbar-nav .dropdown-menu {
          position: absolute;
        }

        .navbar-expand-sm .navbar-nav .nav-link {
          padding-right: 0.5rem;
          padding-left: 0.5rem;
        }

        .navbar-expand-sm > .container,
        .navbar-expand-sm > .container-fluid {
          flex-wrap: nowrap;
        }

        .navbar-expand-sm .navbar-collapse {
          display: flex !important;
          flex-basis: auto;
        }

        .navbar-expand-sm .navbar-toggler {
          display: none;
        }
      }

      @media (max-width: 767.98px) {
        .navbar-expand-md > .container,
        .navbar-expand-md > .container-fluid {
          padding-right: 0;
          padding-left: 0;
        }
      }

      @media (min-width: 768px) {
        .navbar-expand-md {
          flex-flow: row nowrap;
          justify-content: flex-start;
        }

        .navbar-expand-md .navbar-nav {
          flex-direction: row;
        }

        .navbar-expand-md .navbar-nav .dropdown-menu {
          position: absolute;
        }

        .navbar-expand-md .navbar-nav .nav-link {
          padding-right: 0.5rem;
          padding-left: 0.5rem;
        }

        .navbar-expand-md > .container,
        .navbar-expand-md > .container-fluid {
          flex-wrap: nowrap;
        }

        .navbar-expand-md .navbar-collapse {
          display: flex !important;
          flex-basis: auto;
        }

        .navbar-expand-md .navbar-toggler {
          display: none;
        }
      }

      @media (max-width: 991.98px) {
        .navbar-expand-lg > .container,
        .navbar-expand-lg > .container-fluid {
          padding-right: 0;
          padding-left: 0;
        }
      }

      @media (min-width: 992px) {
        .navbar-expand-lg {
          flex-flow: row nowrap;
          justify-content: flex-start;
        }

        .navbar-expand-lg .navbar-nav {
          flex-direction: row;
        }

        .navbar-expand-lg .navbar-nav .dropdown-menu {
          position: absolute;
        }

        .navbar-expand-lg .navbar-nav .nav-link {
          padding-right: 0.5rem;
          padding-left: 0.5rem;
        }

        .navbar-expand-lg > .container,
        .navbar-expand-lg > .container-fluid {
          flex-wrap: nowrap;
        }

        .navbar-expand-lg .navbar-collapse {
          display: flex !important;
          flex-basis: auto;
        }

        .navbar-expand-lg .navbar-toggler {
          display: none;
        }
      }

      @media (max-width: 1299.98px) {
        .navbar-expand-xl > .container,
        .navbar-expand-xl > .container-fluid {
          padding-right: 0;
          padding-left: 0;
        }
      }

      @media (min-width: 1300px) {
        .navbar-expand-xl {
          flex-flow: row nowrap;
          justify-content: flex-start;
        }

        .navbar-expand-xl .navbar-nav {
          flex-direction: row;
        }

        .navbar-expand-xl .navbar-nav .dropdown-menu {
          position: absolute;
        }

        .navbar-expand-xl .navbar-nav .nav-link {
          padding-right: 0.5rem;
          padding-left: 0.5rem;
        }

        .navbar-expand-xl > .container,
        .navbar-expand-xl > .container-fluid {
          flex-wrap: nowrap;
        }

        .navbar-expand-xl .navbar-collapse {
          display: flex !important;
          flex-basis: auto;
        }

        .navbar-expand-xl .navbar-toggler {
          display: none;
        }
      }

      .navbar-expand {
        flex-flow: row nowrap;
        justify-content: flex-start;
      }

      .navbar-expand > .container,
      .navbar-expand > .container-fluid {
        padding-right: 0;
        padding-left: 0;
      }

      .navbar-expand .navbar-nav {
        flex-direction: row;
      }

      .navbar-expand .navbar-nav .dropdown-menu {
        position: absolute;
      }

      .navbar-expand .navbar-nav .nav-link {
        padding-right: 0.5rem;
        padding-left: 0.5rem;
      }

      .navbar-expand > .container,
      .navbar-expand > .container-fluid {
        flex-wrap: nowrap;
      }

      .navbar-expand .navbar-collapse {
        display: flex !important;
        flex-basis: auto;
      }

      .navbar-expand .navbar-toggler {
        display: none;
      }

      .navbar-light .navbar-brand,
      .navbar-light .navbar-brand:focus,
      .navbar-light .navbar-brand:hover {
        color: rgba(0, 0, 0, 0.9);
      }

      .navbar-light .navbar-nav .nav-link {
        color: rgba(0, 0, 0, 0.5);
      }

      .navbar-light .navbar-nav .nav-link:focus,
      .navbar-light .navbar-nav .nav-link:hover {
        color: rgba(0, 0, 0, 0.7);
      }

      .navbar-light .navbar-nav .nav-link.disabled {
        color: rgba(0, 0, 0, 0.3);
      }

      .navbar-light .navbar-nav .active > .nav-link,
      .navbar-light .navbar-nav .nav-link.active,
      .navbar-light .navbar-nav .nav-link.show,
      .navbar-light .navbar-nav .show > .nav-link {
        color: rgba(0, 0, 0, 0.9);
      }

      .navbar-light .navbar-toggler {
        color: rgba(0, 0, 0, 0.5);
        border-color: rgba(0, 0, 0, 0.1);
      }

      .navbar-light .navbar-toggler-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
      }

      .navbar-light .navbar-text {
        color: rgba(0, 0, 0, 0.5);
      }

      .navbar-light .navbar-text a,
      .navbar-light .navbar-text a:focus,
      .navbar-light .navbar-text a:hover {
        color: rgba(0, 0, 0, 0.9);
      }

      .navbar-dark .navbar-brand,
      .navbar-dark .navbar-brand:focus,
      .navbar-dark .navbar-brand:hover {
        color: #fff;
      }

      .navbar-dark .navbar-nav .nav-link {
        color: hsla(0, 0%, 100%, 0.5);
      }

      .navbar-dark .navbar-nav .nav-link:focus,
      .navbar-dark .navbar-nav .nav-link:hover {
        color: hsla(0, 0%, 100%, 0.75);
      }

      .navbar-dark .navbar-nav .nav-link.disabled {
        color: hsla(0, 0%, 100%, 0.25);
      }

      .navbar-dark .navbar-nav .active > .nav-link,
      .navbar-dark .navbar-nav .nav-link.active,
      .navbar-dark .navbar-nav .nav-link.show,
      .navbar-dark .navbar-nav .show > .nav-link {
        color: #fff;
      }

      .navbar-dark .navbar-toggler {
        color: hsla(0, 0%, 100%, 0.5);
        border-color: hsla(0, 0%, 100%, 0.1);
      }

      .navbar-dark .navbar-toggler-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
      }

      .navbar-dark .navbar-text {
        color: hsla(0, 0%, 100%, 0.5);
      }

      .navbar-dark .navbar-text a,
      .navbar-dark .navbar-text a:focus,
      .navbar-dark .navbar-text a:hover {
        color: #fff;
      }

      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
      }

      .card > hr {
        margin-right: 0;
        margin-left: 0;
      }

      .card > .list-group:first-child .list-group-item:first-child {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
      }

      .card > .list-group:last-child .list-group-item:last-child {
        border-bottom-right-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }

      .card-body {
        flex: 1 1 auto;
        padding: 1.25rem;
      }

      .card-title {
        margin-bottom: 0.75rem;
      }

      .card-subtitle {
        margin-top: -0.375rem;
      }

      .card-subtitle,
      .card-text:last-child {
        margin-bottom: 0;
      }

      .card-link:hover {
        text-decoration: none;
      }

      .card-link + .card-link {
        margin-left: 1.25rem;
      }

      .card-header {
        padding: 0.75rem 1.25rem;
        margin-bottom: 0;
        background-color: rgba(0, 0, 0, 0.03);
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      }

      .card-header:first-child {
        border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
      }

      .card-header + .list-group .list-group-item:first-child {
        border-top: 0;
      }

      .card-footer {
        padding: 0.75rem 1.25rem;
        background-color: rgba(0, 0, 0, 0.03);
        border-top: 1px solid rgba(0, 0, 0, 0.125);
      }

      .card-footer:last-child {
        border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
      }

      .card-header-tabs {
        margin-bottom: -0.75rem;
        border-bottom: 0;
      }

      .card-header-pills,
      .card-header-tabs {
        margin-right: -0.625rem;
        margin-left: -0.625rem;
      }

      .card-img-overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1.25rem;
      }

      .card-img {
        width: 100%;
        border-radius: calc(0.25rem - 1px);
      }

      .card-img-top {
        width: 100%;
        border-top-left-radius: calc(0.25rem - 1px);
        border-top-right-radius: calc(0.25rem - 1px);
      }

      .card-img-bottom {
        width: 100%;
        border-bottom-right-radius: calc(0.25rem - 1px);
        border-bottom-left-radius: calc(0.25rem - 1px);
      }

      .card-deck {
        display: flex;
        flex-direction: column;
      }

      .card-deck .card {
        margin-bottom: 10px;
      }

      @media (min-width: 576px) {
        .card-deck {
          flex-flow: row wrap;
          margin-right: -10px;
          margin-left: -10px;
        }

        .card-deck .card {
          display: flex;
          flex: 1 0 0%;
          flex-direction: column;
          margin-right: 10px;
          margin-bottom: 0;
          margin-left: 10px;
        }
      }

      .card-group {
        display: flex;
        flex-direction: column;
      }

      .card-group > .card {
        margin-bottom: 10px;
      }

      @media (min-width: 576px) {
        .card-group {
          flex-flow: row wrap;
        }

        .card-group > .card {
          flex: 1 0 0%;
          margin-bottom: 0;
        }

        .card-group > .card + .card {
          margin-left: 0;
          border-left: 0;
        }

        .card-group > .card:first-child {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        .card-group > .card:first-child .card-header,
        .card-group > .card:first-child .card-img-top {
          border-top-right-radius: 0;
        }

        .card-group > .card:first-child .card-footer,
        .card-group > .card:first-child .card-img-bottom {
          border-bottom-right-radius: 0;
        }

        .card-group > .card:last-child {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        .card-group > .card:last-child .card-header,
        .card-group > .card:last-child .card-img-top {
          border-top-left-radius: 0;
        }

        .card-group > .card:last-child .card-footer,
        .card-group > .card:last-child .card-img-bottom {
          border-bottom-left-radius: 0;
        }

        .card-group > .card:only-child {
          border-radius: 0.25rem;
        }

        .card-group > .card:only-child .card-header,
        .card-group > .card:only-child .card-img-top {
          border-top-left-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
        }

        .card-group > .card:only-child .card-footer,
        .card-group > .card:only-child .card-img-bottom {
          border-bottom-right-radius: 0.25rem;
          border-bottom-left-radius: 0.25rem;
        }

        .card-group > .card:not(:first-child):not(:last-child):not(:only-child),
        .card-group
          > .card:not(:first-child):not(:last-child):not(:only-child)
          .card-footer,
        .card-group
          > .card:not(:first-child):not(:last-child):not(:only-child)
          .card-header,
        .card-group
          > .card:not(:first-child):not(:last-child):not(:only-child)
          .card-img-bottom,
        .card-group
          > .card:not(:first-child):not(:last-child):not(:only-child)
          .card-img-top {
          border-radius: 0;
        }
      }

      .card-columns .card {
        margin-bottom: 0.75rem;
      }

      @media (min-width: 576px) {
        .card-columns {
          -webkit-column-count: 3;
          column-count: 3;
          -webkit-column-gap: 1.25rem;
          column-gap: 1.25rem;
          orphans: 1;
          widows: 1;
        }

        .card-columns .card {
          display: inline-block;
          width: 100%;
        }
      }

      .accordion .card:not(:first-of-type):not(:last-of-type) {
        border-bottom: 0;
        border-radius: 0;
      }

      .accordion .card:not(:first-of-type) .card-header:first-child {
        border-radius: 0;
      }

      .accordion .card:first-of-type {
        border-bottom: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }

      .accordion .card:last-of-type {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }

      .breadcrumb {
        display: flex;
        flex-wrap: wrap;
        padding: 0.75rem 1rem;
        margin-bottom: 1rem;
        list-style: none;
        background-color: #e9ecef;
        border-radius: 0.25rem;
      }

      .breadcrumb-item + .breadcrumb-item {
        padding-left: 0.5rem;
      }

      .breadcrumb-item + .breadcrumb-item:before {
        display: inline-block;
        padding-right: 0.5rem;
        color: #6c757d;
        content: "/";
      }

      .breadcrumb-item + .breadcrumb-item:hover:before {
        text-decoration: underline;
        text-decoration: none;
      }

      .breadcrumb-item.active {
        color: #6c757d;
      }

      .pagination {
        display: flex;
        padding-left: 0;
        list-style: none;
        border-radius: 0.25rem;
      }

      .page-link {
        position: relative;
        display: block;
        padding: 0.5rem 0.75rem;
        margin-left: -1px;
        line-height: 1.25;
        color: #00afa0;
        background-color: #fff;
        border: 1px solid #dee2e6;
      }

      .page-link:hover {
        z-index: 2;
        color: #00635a;
        text-decoration: none;
        background-color: #e9ecef;
        border-color: #dee2e6;
      }

      .page-link:focus {
        z-index: 2;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 175, 160, 0.25);
      }

      .page-link:not(:disabled):not(.disabled) {
        cursor: pointer;
      }

      .page-item:first-child .page-link {
        margin-left: 0;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }

      .page-item:last-child .page-link {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }

      .page-item.active .page-link {
        z-index: 1;
        color: #fff;
        background-color: #00afa0;
        border-color: #00afa0;
      }

      .page-item.disabled .page-link {
        color: #6c757d;
        pointer-events: none;
        cursor: auto;
        background-color: #fff;
        border-color: #dee2e6;
      }

      .pagination-lg .page-link {
        padding: 0.75rem 1.5rem;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      .pagination-lg .page-item:first-child .page-link {
        border-top-left-radius: 0.3rem;
        border-bottom-left-radius: 0.3rem;
      }

      .pagination-lg .page-item:last-child .page-link {
        border-top-right-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
      }

      .pagination-sm .page-link {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
      }

      .pagination-sm .page-item:first-child .page-link {
        border-top-left-radius: 0.2rem;
        border-bottom-left-radius: 0.2rem;
      }

      .pagination-sm .page-item:last-child .page-link {
        border-top-right-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
      }

      .badge {
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25rem;
      }

      .badge:empty {
        display: none;
      }

      .btn .badge {
        position: relative;
        top: -1px;
      }

      .badge-pill {
        padding-right: 0.6em;
        padding-left: 0.6em;
        border-radius: 10rem;
      }

      .badge-primary {
        color: #fff;
        background-color: #00afa0;
      }

      .badge-primary[href]:focus,
      .badge-primary[href]:hover {
        color: #fff;
        text-decoration: none;
        background-color: #007c71;
      }

      .badge-secondary {
        color: #fff;
        background-color: #6c757d;
      }

      .badge-secondary[href]:focus,
      .badge-secondary[href]:hover {
        color: #fff;
        text-decoration: none;
        background-color: #545b62;
      }

      .badge-success {
        color: #fff;
        background-color: #28a745;
      }

      .badge-success[href]:focus,
      .badge-success[href]:hover {
        color: #fff;
        text-decoration: none;
        background-color: #1e7e34;
      }

      .badge-info {
        color: #fff;
        background-color: #17a2b8;
      }

      .badge-info[href]:focus,
      .badge-info[href]:hover {
        color: #fff;
        text-decoration: none;
        background-color: #117a8b;
      }

      .badge-warning {
        color: #212529;
        background-color: #ffc107;
      }

      .badge-warning[href]:focus,
      .badge-warning[href]:hover {
        color: #212529;
        text-decoration: none;
        background-color: #d39e00;
      }

      .badge-danger {
        color: #fff;
        background-color: #f26f6d;
      }

      .badge-danger[href]:focus,
      .badge-danger[href]:hover {
        color: #fff;
        text-decoration: none;
        background-color: #ee413e;
      }

      .badge-light {
        color: #212529;
        background-color: #f8f9fa;
      }

      .badge-light[href]:focus,
      .badge-light[href]:hover {
        color: #212529;
        text-decoration: none;
        background-color: #dae0e5;
      }

      .badge-dark {
        color: #fff;
        background-color: #333;
      }

      .badge-dark[href]:focus,
      .badge-dark[href]:hover {
        color: #fff;
        text-decoration: none;
        background-color: #1a1a1a;
      }

      .badge-dark-gray {
        color: #212529;
        background-color: #9b9b9b;
      }

      .badge-dark-gray[href]:focus,
      .badge-dark-gray[href]:hover {
        color: #212529;
        text-decoration: none;
        background-color: #828282;
      }

      .jumbotron {
        padding: 2rem 1rem;
        margin-bottom: 2rem;
        background-color: #e9ecef;
        border-radius: 0.3rem;
      }

      @media (min-width: 576px) {
        .jumbotron {
          padding: 4rem 2rem;
        }
      }

      .jumbotron-fluid {
        padding-right: 0;
        padding-left: 0;
        border-radius: 0;
      }

      .alert {
        position: relative;
        padding: 0.75rem 1.25rem;
        margin-bottom: 1rem;
        border: 1px solid transparent;
        border-radius: 0.25rem;
      }

      .alert-heading {
        color: inherit;
      }

      .alert-link {
        font-weight: 700;
      }

      .alert-dismissible {
        padding-right: 4rem;
      }

      .alert-dismissible .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.75rem 1.25rem;
        color: inherit;
      }

      .alert-primary {
        color: #005b53;
        background-color: #ccefec;
        border-color: #b8e9e4;
      }

      .alert-primary hr {
        border-top-color: #a5e3dd;
      }

      .alert-primary .alert-link {
        color: #002824;
      }

      .alert-secondary {
        color: #383d41;
        background-color: #e2e3e5;
        border-color: #d6d8db;
      }

      .alert-secondary hr {
        border-top-color: #c8cbcf;
      }

      .alert-secondary .alert-link {
        color: #202326;
      }

      .alert-success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
      }

      .alert-success hr {
        border-top-color: #b1dfbb;
      }

      .alert-success .alert-link {
        color: #0b2e13;
      }

      .alert-info {
        color: #0c5460;
        background-color: #d1ecf1;
        border-color: #bee5eb;
      }

      .alert-info hr {
        border-top-color: #abdde5;
      }

      .alert-info .alert-link {
        color: #062c33;
      }

      .alert-warning {
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeeba;
      }

      .alert-warning hr {
        border-top-color: #ffe8a1;
      }

      .alert-warning .alert-link {
        color: #533f03;
      }

      .alert-danger {
        color: #7e3a39;
        background-color: #fce2e2;
        border-color: #fbd7d6;
      }

      .alert-danger hr {
        border-top-color: #f9c0bf;
      }

      .alert-danger .alert-link {
        color: #5b2a29;
      }

      .alert-light {
        color: #818182;
        background-color: #fefefe;
        border-color: #fdfdfe;
      }

      .alert-light hr {
        border-top-color: #ececf6;
      }

      .alert-light .alert-link {
        color: #686868;
      }

      .alert-dark {
        color: #1b1b1b;
        background-color: #d6d6d6;
        border-color: #c6c6c6;
      }

      .alert-dark hr {
        border-top-color: #b9b9b9;
      }

      .alert-dark .alert-link {
        color: #020202;
      }

      .alert-dark-gray {
        color: #515151;
        background-color: #ebebeb;
        border-color: #e3e3e3;
      }

      .alert-dark-gray hr {
        border-top-color: #d6d6d6;
      }

      .alert-dark-gray .alert-link {
        color: #383838;
      }

      @-webkit-keyframes progress-bar-stripes {
        0% {
          background-position: 1rem 0;
        }

        to {
          background-position: 0 0;
        }
      }

      @keyframes progress-bar-stripes {
        0% {
          background-position: 1rem 0;
        }

        to {
          background-position: 0 0;
        }
      }

      .progress {
        display: flex;
        height: 1rem;
        overflow: hidden;
        font-size: 0.75rem;
        background-color: #e9ecef;
        border-radius: 0.25rem;
      }

      .progress-bar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        background-color: #00afa0;
        transition: width 0.6s ease;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .progress-bar {
          transition: none;
        }
      }

      .progress-bar-striped {
        background-image: linear-gradient(
          45deg,
          hsla(0, 0%, 100%, 0.15) 25%,
          transparent 0,
          transparent 50%,
          hsla(0, 0%, 100%, 0.15) 0,
          hsla(0, 0%, 100%, 0.15) 75%,
          transparent 0,
          transparent
        );
        background-size: 1rem 1rem;
      }

      .progress-bar-animated {
        -webkit-animation: progress-bar-stripes 1s linear infinite;
        animation: progress-bar-stripes 1s linear infinite;
      }

      .media {
        display: flex;
        align-items: flex-start;
      }

      .media-body {
        flex: 1;
      }

      .list-group {
        display: flex;
        flex-direction: column;
        padding-left: 0;
        margin-bottom: 0;
      }

      .list-group-item-action {
        width: 100%;
        color: #495057;
        text-align: inherit;
      }

      .list-group-item-action:focus,
      .list-group-item-action:hover {
        color: #495057;
        text-decoration: none;
        background-color: #f8f9fa;
      }

      .list-group-item-action:active {
        color: #212529;
        background-color: #e9ecef;
      }

      .list-group-item {
        position: relative;
        display: block;
        padding: 0.75rem 1.25rem;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
      }

      .list-group-item:first-child {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
      }

      .list-group-item:last-child {
        margin-bottom: 0;
        border-bottom-right-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }

      .list-group-item:focus,
      .list-group-item:hover {
        z-index: 1;
        text-decoration: none;
      }

      .list-group-item.disabled,
      .list-group-item:disabled {
        color: #6c757d;
        background-color: #fff;
      }

      .list-group-item.active {
        z-index: 2;
        color: #fff;
        background-color: #00afa0;
        border-color: #00afa0;
      }

      .list-group-flush .list-group-item {
        border-right: 0;
        border-left: 0;
        border-radius: 0;
      }

      .list-group-flush:first-child .list-group-item:first-child {
        border-top: 0;
      }

      .list-group-flush:last-child .list-group-item:last-child {
        border-bottom: 0;
      }

      .list-group-item-primary {
        color: #005b53;
        background-color: #b8e9e4;
      }

      .list-group-item-primary.list-group-item-action:focus,
      .list-group-item-primary.list-group-item-action:hover {
        color: #005b53;
        background-color: #a5e3dd;
      }

      .list-group-item-primary.list-group-item-action.active {
        color: #fff;
        background-color: #005b53;
        border-color: #005b53;
      }

      .list-group-item-secondary {
        color: #383d41;
        background-color: #d6d8db;
      }

      .list-group-item-secondary.list-group-item-action:focus,
      .list-group-item-secondary.list-group-item-action:hover {
        color: #383d41;
        background-color: #c8cbcf;
      }

      .list-group-item-secondary.list-group-item-action.active {
        color: #fff;
        background-color: #383d41;
        border-color: #383d41;
      }

      .list-group-item-success {
        color: #155724;
        background-color: #c3e6cb;
      }

      .list-group-item-success.list-group-item-action:focus,
      .list-group-item-success.list-group-item-action:hover {
        color: #155724;
        background-color: #b1dfbb;
      }

      .list-group-item-success.list-group-item-action.active {
        color: #fff;
        background-color: #155724;
        border-color: #155724;
      }

      .list-group-item-info {
        color: #0c5460;
        background-color: #bee5eb;
      }

      .list-group-item-info.list-group-item-action:focus,
      .list-group-item-info.list-group-item-action:hover {
        color: #0c5460;
        background-color: #abdde5;
      }

      .list-group-item-info.list-group-item-action.active {
        color: #fff;
        background-color: #0c5460;
        border-color: #0c5460;
      }

      .list-group-item-warning {
        color: #856404;
        background-color: #ffeeba;
      }

      .list-group-item-warning.list-group-item-action:focus,
      .list-group-item-warning.list-group-item-action:hover {
        color: #856404;
        background-color: #ffe8a1;
      }

      .list-group-item-warning.list-group-item-action.active {
        color: #fff;
        background-color: #856404;
        border-color: #856404;
      }

      .list-group-item-danger {
        color: #7e3a39;
        background-color: #fbd7d6;
      }

      .list-group-item-danger.list-group-item-action:focus,
      .list-group-item-danger.list-group-item-action:hover {
        color: #7e3a39;
        background-color: #f9c0bf;
      }

      .list-group-item-danger.list-group-item-action.active {
        color: #fff;
        background-color: #7e3a39;
        border-color: #7e3a39;
      }

      .list-group-item-light {
        color: #818182;
        background-color: #fdfdfe;
      }

      .list-group-item-light.list-group-item-action:focus,
      .list-group-item-light.list-group-item-action:hover {
        color: #818182;
        background-color: #ececf6;
      }

      .list-group-item-light.list-group-item-action.active {
        color: #fff;
        background-color: #818182;
        border-color: #818182;
      }

      .list-group-item-dark {
        color: #1b1b1b;
        background-color: #c6c6c6;
      }

      .list-group-item-dark.list-group-item-action:focus,
      .list-group-item-dark.list-group-item-action:hover {
        color: #1b1b1b;
        background-color: #b9b9b9;
      }

      .list-group-item-dark.list-group-item-action.active {
        color: #fff;
        background-color: #1b1b1b;
        border-color: #1b1b1b;
      }

      .list-group-item-dark-gray {
        color: #515151;
        background-color: #e3e3e3;
      }

      .list-group-item-dark-gray.list-group-item-action:focus,
      .list-group-item-dark-gray.list-group-item-action:hover {
        color: #515151;
        background-color: #d6d6d6;
      }

      .list-group-item-dark-gray.list-group-item-action.active {
        color: #fff;
        background-color: #515151;
        border-color: #515151;
      }

      .close {
        float: right;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: 0.5;
      }

      .close:not(:disabled):not(.disabled) {
        cursor: pointer;
      }

      .close:not(:disabled):not(.disabled):focus,
      .close:not(:disabled):not(.disabled):hover {
        color: #000;
        text-decoration: none;
        opacity: 0.75;
      }

      button.close {
        padding: 0;
        background-color: transparent;
        border: 0;
        -webkit-appearance: none;
      }

      .modal,
      .modal-open {
        overflow: hidden;
      }

      .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        display: none;
        outline: 0;
      }

      .modal-open .modal {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .modal-dialog {
        position: relative;
        width: auto;
        margin: 0.5rem;
        pointer-events: none;
      }

      .modal.fade .modal-dialog {
        transition: -webkit-transform 0.3s ease-out;
        transition: transform 0.3s ease-out;
        transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
        -webkit-transform: translateY(-25%);
        transform: translateY(-25%);
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .modal.fade .modal-dialog {
          transition: none;
        }
      }

      .modal.show .modal-dialog {
        -webkit-transform: translate(0);
        transform: translate(0);
      }

      .modal-dialog-centered {
        display: flex;
        align-items: center;
        min-height: calc(100% - 1rem);
      }

      .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.3rem;
        outline: 0;
      }

      .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #000;
      }

      .modal-backdrop.fade {
        opacity: 0;
      }

      .modal-backdrop.show {
        opacity: 0.5;
      }

      .modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #e9ecef;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
      }

      .modal-header .close {
        padding: 1rem;
        margin: -1rem -1rem -1rem auto;
      }

      .modal-title {
        margin-bottom: 0;
        line-height: 1.5;
      }

      .modal-body {
        position: relative;
        flex: 1 1 auto;
        padding: 1rem;
      }

      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1rem;
        border-top: 1px solid #e9ecef;
      }

      .modal-footer > :not(:first-child) {
        margin-left: 0.25rem;
      }

      .modal-footer > :not(:last-child) {
        margin-right: 0.25rem;
      }

      .modal-scrollbar-measure {
        position: absolute;
        top: -9999px;
        width: 50px;
        height: 50px;
        overflow: scroll;
      }

      @media (min-width: 576px) {
        .modal-dialog {
          max-width: 500px;
          margin: 1.75rem auto;
        }

        .modal-dialog-centered {
          min-height: calc(100% - 3.5rem);
        }

        .modal-sm {
          max-width: 380px;
        }
      }

      @media (min-width: 992px) {
        .modal-lg {
          max-width: 800px;
        }
      }

      .tooltip {
        position: absolute;
        z-index: 1070;
        display: block;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Raleway,
          Helvetica Neue, Arial, sans-serif;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5;
      }

      .tooltip,
      [dir="ltr"] .tooltip {
        text-align: left;
      }

      [dir="rtl"] .tooltip {
        text-align: right;
      }

      .tooltip {
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-break: normal;
        word-spacing: normal;
        white-space: normal;
        line-break: auto;
        font-size: 0.875rem;
        word-wrap: break-word;
        opacity: 0;
      }

      .tooltip.show {
        opacity: 0.9;
      }

      .tooltip .arrow {
        position: absolute;
        display: block;
        width: 0.8rem;
        height: 0.4rem;
      }

      .tooltip .arrow:before {
        position: absolute;
        content: "";
        border-color: transparent;
        border-style: solid;
      }

      .bs-tooltip-auto[x-placement^="top"],
      .bs-tooltip-top {
        padding: 0.4rem 0;
      }

      .bs-tooltip-auto[x-placement^="top"] .arrow,
      .bs-tooltip-top .arrow {
        bottom: 0;
      }

      .bs-tooltip-auto[x-placement^="top"] .arrow:before,
      .bs-tooltip-top .arrow:before {
        top: 0;
        border-width: 0.4rem 0.4rem 0;
        border-top-color: #000;
      }

      .bs-tooltip-auto[x-placement^="right"],
      .bs-tooltip-right {
        padding: 0 0.4rem;
      }

      .bs-tooltip-auto[x-placement^="right"] .arrow,
      .bs-tooltip-right .arrow {
        left: 0;
        width: 0.4rem;
        height: 0.8rem;
      }

      .bs-tooltip-auto[x-placement^="right"] .arrow:before,
      .bs-tooltip-right .arrow:before {
        right: 0;
        border-width: 0.4rem 0.4rem 0.4rem 0;
        border-right-color: #000;
      }

      .bs-tooltip-auto[x-placement^="bottom"],
      .bs-tooltip-bottom {
        padding: 0.4rem 0;
      }

      .bs-tooltip-auto[x-placement^="bottom"] .arrow,
      .bs-tooltip-bottom .arrow {
        top: 0;
      }

      .bs-tooltip-auto[x-placement^="bottom"] .arrow:before,
      .bs-tooltip-bottom .arrow:before {
        bottom: 0;
        border-width: 0 0.4rem 0.4rem;
        border-bottom-color: #000;
      }

      .bs-tooltip-auto[x-placement^="left"],
      .bs-tooltip-left {
        padding: 0 0.4rem;
      }

      .bs-tooltip-auto[x-placement^="left"] .arrow,
      .bs-tooltip-left .arrow {
        right: 0;
        width: 0.4rem;
        height: 0.8rem;
      }

      .bs-tooltip-auto[x-placement^="left"] .arrow:before,
      .bs-tooltip-left .arrow:before {
        left: 0;
        border-width: 0.4rem 0 0.4rem 0.4rem;
        border-left-color: #000;
      }

      .tooltip-inner {
        max-width: 200px;
        padding: 0.25rem 0.5rem;
        color: #fff;
        text-align: center;
        background-color: #000;
        border-radius: 0.25rem;
      }

      .popover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1060;
        display: block;
        max-width: 276px;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Raleway,
          Helvetica Neue, Arial, sans-serif;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5;
      }

      .popover,
      [dir="ltr"] .popover {
        text-align: left;
      }

      [dir="rtl"] .popover {
        text-align: right;
      }

      .popover {
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-break: normal;
        word-spacing: normal;
        white-space: normal;
        line-break: auto;
        font-size: 0.875rem;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.3rem;
      }

      .popover .arrow {
        position: absolute;
        display: block;
        width: 1rem;
        height: 0.5rem;
        margin: 0 0.3rem;
      }

      .popover .arrow:after,
      .popover .arrow:before {
        position: absolute;
        display: block;
        content: "";
        border-color: transparent;
        border-style: solid;
      }

      .bs-popover-auto[x-placement^="top"],
      .bs-popover-top {
        margin-bottom: 0.5rem;
      }

      .bs-popover-auto[x-placement^="top"] .arrow,
      .bs-popover-top .arrow {
        bottom: calc((0.5rem + 1px) * -1);
      }

      .bs-popover-auto[x-placement^="top"] .arrow:after,
      .bs-popover-auto[x-placement^="top"] .arrow:before,
      .bs-popover-top .arrow:after,
      .bs-popover-top .arrow:before {
        border-width: 0.5rem 0.5rem 0;
      }

      .bs-popover-auto[x-placement^="top"] .arrow:before,
      .bs-popover-top .arrow:before {
        bottom: 0;
        border-top-color: rgba(0, 0, 0, 0.25);
      }

      .bs-popover-auto[x-placement^="top"] .arrow:after,
      .bs-popover-top .arrow:after {
        bottom: 1px;
        border-top-color: #fff;
      }

      .bs-popover-auto[x-placement^="right"],
      .bs-popover-right {
        margin-left: 0.5rem;
      }

      .bs-popover-auto[x-placement^="right"] .arrow,
      .bs-popover-right .arrow {
        left: calc((0.5rem + 1px) * -1);
        width: 0.5rem;
        height: 1rem;
        margin: 0.3rem 0;
      }

      .bs-popover-auto[x-placement^="right"] .arrow:after,
      .bs-popover-auto[x-placement^="right"] .arrow:before,
      .bs-popover-right .arrow:after,
      .bs-popover-right .arrow:before {
        border-width: 0.5rem 0.5rem 0.5rem 0;
      }

      .bs-popover-auto[x-placement^="right"] .arrow:before,
      .bs-popover-right .arrow:before {
        left: 0;
        border-right-color: rgba(0, 0, 0, 0.25);
      }

      .bs-popover-auto[x-placement^="right"] .arrow:after,
      .bs-popover-right .arrow:after {
        left: 1px;
        border-right-color: #fff;
      }

      .bs-popover-auto[x-placement^="bottom"],
      .bs-popover-bottom {
        margin-top: 0.5rem;
      }

      .bs-popover-auto[x-placement^="bottom"] .arrow,
      .bs-popover-bottom .arrow {
        top: calc((0.5rem + 1px) * -1);
      }

      .bs-popover-auto[x-placement^="bottom"] .arrow:after,
      .bs-popover-auto[x-placement^="bottom"] .arrow:before,
      .bs-popover-bottom .arrow:after,
      .bs-popover-bottom .arrow:before {
        border-width: 0 0.5rem 0.5rem;
      }

      .bs-popover-auto[x-placement^="bottom"] .arrow:before,
      .bs-popover-bottom .arrow:before {
        top: 0;
        border-bottom-color: rgba(0, 0, 0, 0.25);
      }

      .bs-popover-auto[x-placement^="bottom"] .arrow:after,
      .bs-popover-bottom .arrow:after {
        top: 1px;
        border-bottom-color: #fff;
      }

      .bs-popover-auto[x-placement^="bottom"] .popover-header:before,
      .bs-popover-bottom .popover-header:before {
        position: absolute;
        top: 0;
        left: 50%;
        display: block;
        width: 1rem;
        margin-left: -0.5rem;
        content: "";
        border-bottom: 1px solid #f7f7f7;
      }

      .bs-popover-auto[x-placement^="left"],
      .bs-popover-left {
        margin-right: 0.5rem;
      }

      .bs-popover-auto[x-placement^="left"] .arrow,
      .bs-popover-left .arrow {
        right: calc((0.5rem + 1px) * -1);
        width: 0.5rem;
        height: 1rem;
        margin: 0.3rem 0;
      }

      .bs-popover-auto[x-placement^="left"] .arrow:after,
      .bs-popover-auto[x-placement^="left"] .arrow:before,
      .bs-popover-left .arrow:after,
      .bs-popover-left .arrow:before {
        border-width: 0.5rem 0 0.5rem 0.5rem;
      }

      .bs-popover-auto[x-placement^="left"] .arrow:before,
      .bs-popover-left .arrow:before {
        right: 0;
        border-left-color: rgba(0, 0, 0, 0.25);
      }

      .bs-popover-auto[x-placement^="left"] .arrow:after,
      .bs-popover-left .arrow:after {
        right: 1px;
        border-left-color: #fff;
      }

      .popover-header {
        padding: 0.5rem 0.75rem;
        margin-bottom: 0;
        font-size: 1rem;
        color: inherit;
        background-color: #f7f7f7;
        border-bottom: 1px solid #ebebeb;
        border-top-left-radius: calc(0.3rem - 1px);
        border-top-right-radius: calc(0.3rem - 1px);
      }

      .popover-header:empty {
        display: none;
      }

      .popover-body {
        padding: 0.5rem 0.75rem;
        color: #212529;
      }

      .carousel {
        position: relative;
      }

      .carousel-inner {
        position: relative;
        width: 100%;
        overflow: hidden;
      }

      .carousel-item {
        position: relative;
        display: none;
        align-items: center;
        width: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-perspective: 1000px;
        perspective: 1000px;
      }

      .carousel-item-next,
      .carousel-item-prev,
      .carousel-item.active {
        display: block;
        transition: -webkit-transform 0.6s ease;
        transition: transform 0.6s ease;
        transition: transform 0.6s ease, -webkit-transform 0.6s ease;
      }

      @media screen and (prefers-reduced-motion: reduce) {
        .carousel-item-next,
        .carousel-item-prev,
        .carousel-item.active {
          transition: none;
        }
      }

      .carousel-item-next,
      .carousel-item-prev {
        position: absolute;
        top: 0;
      }

      .carousel-item-next.carousel-item-left,
      .carousel-item-prev.carousel-item-right {
        -webkit-transform: translateX(0);
        transform: translateX(0);
      }

      @supports (
        (-webkit-transform-style: preserve-3d) or (transform-style: preserve-3d)
      ) {
        .carousel-item-next.carousel-item-left,
        .carousel-item-prev.carousel-item-right {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
      }

      .active.carousel-item-right,
      .carousel-item-next {
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
      }

      @supports (
        (-webkit-transform-style: preserve-3d) or (transform-style: preserve-3d)
      ) {
        .active.carousel-item-right,
        .carousel-item-next {
          -webkit-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);
        }
      }

      .active.carousel-item-left,
      .carousel-item-prev {
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
      }

      @supports (
        (-webkit-transform-style: preserve-3d) or (transform-style: preserve-3d)
      ) {
        .active.carousel-item-left,
        .carousel-item-prev {
          -webkit-transform: translate3d(-100%, 0, 0);
          transform: translate3d(-100%, 0, 0);
        }
      }

      .carousel-fade .carousel-item {
        opacity: 0;
        transition-duration: 0.6s;
        transition-property: opacity;
      }

      .carousel-fade .carousel-item-next.carousel-item-left,
      .carousel-fade .carousel-item-prev.carousel-item-right,
      .carousel-fade .carousel-item.active {
        opacity: 1;
      }

      .carousel-fade .active.carousel-item-left,
      .carousel-fade .active.carousel-item-right {
        opacity: 0;
      }

      .carousel-fade .active.carousel-item-left,
      .carousel-fade .active.carousel-item-prev,
      .carousel-fade .carousel-item-next,
      .carousel-fade .carousel-item-prev,
      .carousel-fade .carousel-item.active {
        -webkit-transform: translateX(0);
        transform: translateX(0);
      }

      @supports (
        (-webkit-transform-style: preserve-3d) or (transform-style: preserve-3d)
      ) {
        .carousel-fade .active.carousel-item-left,
        .carousel-fade .active.carousel-item-prev,
        .carousel-fade .carousel-item-next,
        .carousel-fade .carousel-item-prev,
        .carousel-fade .carousel-item.active {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
      }

      .carousel-control-next,
      .carousel-control-prev {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 15%;
        color: #fff;
        text-align: center;
        opacity: 0.5;
      }

      .carousel-control-next:focus,
      .carousel-control-next:hover,
      .carousel-control-prev:focus,
      .carousel-control-prev:hover {
        color: #fff;
        text-decoration: none;
        outline: 0;
        opacity: 0.9;
      }

      .carousel-control-prev {
        left: 0;
      }

      .carousel-control-next {
        right: 0;
      }

      .carousel-control-next-icon,
      .carousel-control-prev-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: transparent no-repeat 50%;
        background-size: 100% 100%;
      }

      .carousel-control-prev-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
      }

      .carousel-control-next-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
      }

      .carousel-indicators {
        position: absolute;
        right: 0;
        bottom: 10px;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        padding-left: 0;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
      }

      .carousel-indicators li {
        position: relative;
        flex: 0 1 auto;
        width: 30px;
        height: 3px;
        margin-right: 3px;
        margin-left: 3px;
        text-indent: -999px;
        cursor: pointer;
        background-color: hsla(0, 0%, 100%, 0.5);
      }

      .carousel-indicators li:before {
        top: -10px;
      }

      .carousel-indicators li:after,
      .carousel-indicators li:before {
        position: absolute;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 10px;
        content: "";
      }

      .carousel-indicators li:after {
        bottom: -10px;
      }

      .carousel-indicators .active {
        background-color: #fff;
      }

      .carousel-caption {
        position: absolute;
        right: 15%;
        bottom: 20px;
        left: 15%;
        z-index: 10;
        padding-top: 20px;
        padding-bottom: 20px;
        color: #fff;
        text-align: center;
      }

      .align-baseline {
        vertical-align: baseline !important;
      }

      .align-top {
        vertical-align: top !important;
      }

      .align-middle {
        vertical-align: middle !important;
      }

      .align-bottom {
        vertical-align: bottom !important;
      }

      .align-text-bottom {
        vertical-align: text-bottom !important;
      }

      .align-text-top {
        vertical-align: text-top !important;
      }

      .bg-primary {
        background-color: #00afa0 !important;
      }

      a.bg-primary:focus,
      a.bg-primary:hover,
      button.bg-primary:focus,
      button.bg-primary:hover {
        background-color: #007c71 !important;
      }

      .bg-secondary {
        background-color: #6c757d !important;
      }

      a.bg-secondary:focus,
      a.bg-secondary:hover,
      button.bg-secondary:focus,
      button.bg-secondary:hover {
        background-color: #545b62 !important;
      }

      .bg-success {
        background-color: #28a745 !important;
      }

      a.bg-success:focus,
      a.bg-success:hover,
      button.bg-success:focus,
      button.bg-success:hover {
        background-color: #1e7e34 !important;
      }

      .bg-info {
        background-color: #17a2b8 !important;
      }

      a.bg-info:focus,
      a.bg-info:hover,
      button.bg-info:focus,
      button.bg-info:hover {
        background-color: #117a8b !important;
      }

      .bg-warning {
        background-color: #ffc107 !important;
      }

      a.bg-warning:focus,
      a.bg-warning:hover,
      button.bg-warning:focus,
      button.bg-warning:hover {
        background-color: #d39e00 !important;
      }

      .bg-danger {
        background-color: #f26f6d !important;
      }

      a.bg-danger:focus,
      a.bg-danger:hover,
      button.bg-danger:focus,
      button.bg-danger:hover {
        background-color: #ee413e !important;
      }

      .bg-light {
        background-color: #f8f9fa !important;
      }

      a.bg-light:focus,
      a.bg-light:hover,
      button.bg-light:focus,
      button.bg-light:hover {
        background-color: #dae0e5 !important;
      }

      .bg-dark {
        background-color: #333 !important;
      }

      a.bg-dark:focus,
      a.bg-dark:hover,
      button.bg-dark:focus,
      button.bg-dark:hover {
        background-color: #1a1a1a !important;
      }

      .bg-dark-gray {
        background-color: #9b9b9b !important;
      }

      a.bg-dark-gray:focus,
      a.bg-dark-gray:hover,
      button.bg-dark-gray:focus,
      button.bg-dark-gray:hover {
        background-color: #828282 !important;
      }

      .bg-white {
        background-color: #fff !important;
      }

      .bg-transparent {
        background-color: transparent !important;
      }

      .border {
        border: 1px solid #dee2e6 !important;
      }

      .border-top {
        border-top: 1px solid #dee2e6 !important;
      }

      .border-right {
        border-right: 1px solid #dee2e6 !important;
      }

      .border-bottom {
        border-bottom: 1px solid #dee2e6 !important;
      }

      .border-left {
        border-left: 1px solid #dee2e6 !important;
      }

      .border-0 {
        border: 0 !important;
      }

      .border-top-0 {
        border-top: 0 !important;
      }

      .border-right-0 {
        border-right: 0 !important;
      }

      .border-bottom-0 {
        border-bottom: 0 !important;
      }

      .border-left-0 {
        border-left: 0 !important;
      }

      .border-primary {
        border-color: #00afa0 !important;
      }

      .border-secondary {
        border-color: #6c757d !important;
      }

      .border-success {
        border-color: #28a745 !important;
      }

      .border-info {
        border-color: #17a2b8 !important;
      }

      .border-warning {
        border-color: #ffc107 !important;
      }

      .border-danger {
        border-color: #f26f6d !important;
      }

      .border-light {
        border-color: #f8f9fa !important;
      }

      .border-dark {
        border-color: #333 !important;
      }

      .border-dark-gray {
        border-color: #9b9b9b !important;
      }

      .border-white {
        border-color: #fff !important;
      }

      .rounded {
        border-radius: 0.25rem !important;
      }

      .rounded-top {
        border-top-left-radius: 0.25rem !important;
      }

      .rounded-right,
      .rounded-top {
        border-top-right-radius: 0.25rem !important;
      }

      .rounded-bottom,
      .rounded-right {
        border-bottom-right-radius: 0.25rem !important;
      }

      .rounded-bottom,
      .rounded-left {
        border-bottom-left-radius: 0.25rem !important;
      }

      .rounded-left {
        border-top-left-radius: 0.25rem !important;
      }

      .rounded-circle {
        border-radius: 50% !important;
      }

      .rounded-0 {
        border-radius: 0 !important;
      }

      .clearfix:after {
        display: block;
        clear: both;
        content: "";
      }

      .d-none {
        display: none !important;
      }

      .d-inline {
        display: inline !important;
      }

      .d-inline-block {
        display: inline-block !important;
      }

      .d-block {
        display: block !important;
      }

      .d-table {
        display: table !important;
      }

      .d-table-row {
        display: table-row !important;
      }

      .d-table-cell {
        display: table-cell !important;
      }

      .d-flex {
        display: flex !important;
      }

      .d-inline-flex {
        display: inline-flex !important;
      }

      @media (min-width: 576px) {
        .d-sm-none {
          display: none !important;
        }

        .d-sm-inline {
          display: inline !important;
        }

        .d-sm-inline-block {
          display: inline-block !important;
        }

        .d-sm-block {
          display: block !important;
        }

        .d-sm-table {
          display: table !important;
        }

        .d-sm-table-row {
          display: table-row !important;
        }

        .d-sm-table-cell {
          display: table-cell !important;
        }

        .d-sm-flex {
          display: flex !important;
        }

        .d-sm-inline-flex {
          display: inline-flex !important;
        }
      }

      @media (min-width: 768px) {
        .d-md-none {
          display: none !important;
        }

        .d-md-inline {
          display: inline !important;
        }

        .d-md-inline-block {
          display: inline-block !important;
        }

        .d-md-block {
          display: block !important;
        }

        .d-md-table {
          display: table !important;
        }

        .d-md-table-row {
          display: table-row !important;
        }

        .d-md-table-cell {
          display: table-cell !important;
        }

        .d-md-flex {
          display: flex !important;
        }

        .d-md-inline-flex {
          display: inline-flex !important;
        }
      }

      @media (min-width: 992px) {
        .d-lg-none {
          display: none !important;
        }

        .d-lg-inline {
          display: inline !important;
        }

        .d-lg-inline-block {
          display: inline-block !important;
        }

        .d-lg-block {
          display: block !important;
        }

        .d-lg-table {
          display: table !important;
        }

        .d-lg-table-row {
          display: table-row !important;
        }

        .d-lg-table-cell {
          display: table-cell !important;
        }

        .d-lg-flex {
          display: flex !important;
        }

        .d-lg-inline-flex {
          display: inline-flex !important;
        }
      }

      @media (min-width: 1300px) {
        .d-xl-none {
          display: none !important;
        }

        .d-xl-inline {
          display: inline !important;
        }

        .d-xl-inline-block {
          display: inline-block !important;
        }

        .d-xl-block {
          display: block !important;
        }

        .d-xl-table {
          display: table !important;
        }

        .d-xl-table-row {
          display: table-row !important;
        }

        .d-xl-table-cell {
          display: table-cell !important;
        }

        .d-xl-flex {
          display: flex !important;
        }

        .d-xl-inline-flex {
          display: inline-flex !important;
        }
      }

      @media print {
        .d-print-none {
          display: none !important;
        }

        .d-print-inline {
          display: inline !important;
        }

        .d-print-inline-block {
          display: inline-block !important;
        }

        .d-print-block {
          display: block !important;
        }

        .d-print-table {
          display: table !important;
        }

        .d-print-table-row {
          display: table-row !important;
        }

        .d-print-table-cell {
          display: table-cell !important;
        }

        .d-print-flex {
          display: flex !important;
        }

        .d-print-inline-flex {
          display: inline-flex !important;
        }
      }

      .embed-responsive {
        position: relative;
        display: block;
        width: 100%;
        padding: 0;
        overflow: hidden;
      }

      .embed-responsive:before {
        display: block;
        content: "";
      }

      .embed-responsive .embed-responsive-item,
      .embed-responsive embed,
      .embed-responsive iframe,
      .embed-responsive object,
      .embed-responsive video {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }

      .embed-responsive-21by9:before {
        padding-top: 42.85714%;
      }

      .embed-responsive-16by9:before {
        padding-top: 56.25%;
      }

      .embed-responsive-4by3:before {
        padding-top: 75%;
      }

      .embed-responsive-1by1:before {
        padding-top: 100%;
      }

      .flex-row {
        flex-direction: row !important;
      }

      .flex-column {
        flex-direction: column !important;
      }

      .flex-row-reverse {
        flex-direction: row-reverse !important;
      }

      .flex-column-reverse {
        flex-direction: column-reverse !important;
      }

      .flex-wrap {
        flex-wrap: wrap !important;
      }

      .flex-nowrap {
        flex-wrap: nowrap !important;
      }

      .flex-wrap-reverse {
        flex-wrap: wrap-reverse !important;
      }

      .flex-fill {
        flex: 1 1 auto !important;
      }

      .flex-grow-0 {
        flex-grow: 0 !important;
      }

      .flex-grow-1 {
        flex-grow: 1 !important;
      }

      .flex-shrink-0 {
        flex-shrink: 0 !important;
      }

      .flex-shrink-1 {
        flex-shrink: 1 !important;
      }

      .justify-content-start {
        justify-content: flex-start !important;
      }

      .justify-content-end {
        justify-content: flex-end !important;
      }

      .justify-content-center {
        justify-content: center !important;
      }

      .justify-content-between {
        justify-content: space-between !important;
      }

      .justify-content-around {
        justify-content: space-around !important;
      }

      .align-items-start {
        align-items: flex-start !important;
      }

      .align-items-end {
        align-items: flex-end !important;
      }

      .align-items-center {
        align-items: center !important;
      }

      .align-items-baseline {
        align-items: baseline !important;
      }

      .align-items-stretch {
        align-items: stretch !important;
      }

      .align-content-start {
        align-content: flex-start !important;
      }

      .align-content-end {
        align-content: flex-end !important;
      }

      .align-content-center {
        align-content: center !important;
      }

      .align-content-between {
        align-content: space-between !important;
      }

      .align-content-around {
        align-content: space-around !important;
      }

      .align-content-stretch {
        align-content: stretch !important;
      }

      .align-self-auto {
        align-self: auto !important;
      }

      .align-self-start {
        align-self: flex-start !important;
      }

      .align-self-end {
        align-self: flex-end !important;
      }

      .align-self-center {
        align-self: center !important;
      }

      .align-self-baseline {
        align-self: baseline !important;
      }

      .align-self-stretch {
        align-self: stretch !important;
      }

      @media (min-width: 576px) {
        .flex-sm-row {
          flex-direction: row !important;
        }

        .flex-sm-column {
          flex-direction: column !important;
        }

        .flex-sm-row-reverse {
          flex-direction: row-reverse !important;
        }

        .flex-sm-column-reverse {
          flex-direction: column-reverse !important;
        }

        .flex-sm-wrap {
          flex-wrap: wrap !important;
        }

        .flex-sm-nowrap {
          flex-wrap: nowrap !important;
        }

        .flex-sm-wrap-reverse {
          flex-wrap: wrap-reverse !important;
        }

        .flex-sm-fill {
          flex: 1 1 auto !important;
        }

        .flex-sm-grow-0 {
          flex-grow: 0 !important;
        }

        .flex-sm-grow-1 {
          flex-grow: 1 !important;
        }

        .flex-sm-shrink-0 {
          flex-shrink: 0 !important;
        }

        .flex-sm-shrink-1 {
          flex-shrink: 1 !important;
        }

        .justify-content-sm-start {
          justify-content: flex-start !important;
        }

        .justify-content-sm-end {
          justify-content: flex-end !important;
        }

        .justify-content-sm-center {
          justify-content: center !important;
        }

        .justify-content-sm-between {
          justify-content: space-between !important;
        }

        .justify-content-sm-around {
          justify-content: space-around !important;
        }

        .align-items-sm-start {
          align-items: flex-start !important;
        }

        .align-items-sm-end {
          align-items: flex-end !important;
        }

        .align-items-sm-center {
          align-items: center !important;
        }

        .align-items-sm-baseline {
          align-items: baseline !important;
        }

        .align-items-sm-stretch {
          align-items: stretch !important;
        }

        .align-content-sm-start {
          align-content: flex-start !important;
        }

        .align-content-sm-end {
          align-content: flex-end !important;
        }

        .align-content-sm-center {
          align-content: center !important;
        }

        .align-content-sm-between {
          align-content: space-between !important;
        }

        .align-content-sm-around {
          align-content: space-around !important;
        }

        .align-content-sm-stretch {
          align-content: stretch !important;
        }

        .align-self-sm-auto {
          align-self: auto !important;
        }

        .align-self-sm-start {
          align-self: flex-start !important;
        }

        .align-self-sm-end {
          align-self: flex-end !important;
        }

        .align-self-sm-center {
          align-self: center !important;
        }

        .align-self-sm-baseline {
          align-self: baseline !important;
        }

        .align-self-sm-stretch {
          align-self: stretch !important;
        }
      }

      @media (min-width: 768px) {
        .flex-md-row {
          flex-direction: row !important;
        }

        .flex-md-column {
          flex-direction: column !important;
        }

        .flex-md-row-reverse {
          flex-direction: row-reverse !important;
        }

        .flex-md-column-reverse {
          flex-direction: column-reverse !important;
        }

        .flex-md-wrap {
          flex-wrap: wrap !important;
        }

        .flex-md-nowrap {
          flex-wrap: nowrap !important;
        }

        .flex-md-wrap-reverse {
          flex-wrap: wrap-reverse !important;
        }

        .flex-md-fill {
          flex: 1 1 auto !important;
        }

        .flex-md-grow-0 {
          flex-grow: 0 !important;
        }

        .flex-md-grow-1 {
          flex-grow: 1 !important;
        }

        .flex-md-shrink-0 {
          flex-shrink: 0 !important;
        }

        .flex-md-shrink-1 {
          flex-shrink: 1 !important;
        }

        .justify-content-md-start {
          justify-content: flex-start !important;
        }

        .justify-content-md-end {
          justify-content: flex-end !important;
        }

        .justify-content-md-center {
          justify-content: center !important;
        }

        .justify-content-md-between {
          justify-content: space-between !important;
        }

        .justify-content-md-around {
          justify-content: space-around !important;
        }

        .align-items-md-start {
          align-items: flex-start !important;
        }

        .align-items-md-end {
          align-items: flex-end !important;
        }

        .align-items-md-center {
          align-items: center !important;
        }

        .align-items-md-baseline {
          align-items: baseline !important;
        }

        .align-items-md-stretch {
          align-items: stretch !important;
        }

        .align-content-md-start {
          align-content: flex-start !important;
        }

        .align-content-md-end {
          align-content: flex-end !important;
        }

        .align-content-md-center {
          align-content: center !important;
        }

        .align-content-md-between {
          align-content: space-between !important;
        }

        .align-content-md-around {
          align-content: space-around !important;
        }

        .align-content-md-stretch {
          align-content: stretch !important;
        }

        .align-self-md-auto {
          align-self: auto !important;
        }

        .align-self-md-start {
          align-self: flex-start !important;
        }

        .align-self-md-end {
          align-self: flex-end !important;
        }

        .align-self-md-center {
          align-self: center !important;
        }

        .align-self-md-baseline {
          align-self: baseline !important;
        }

        .align-self-md-stretch {
          align-self: stretch !important;
        }
      }

      @media (min-width: 992px) {
        .flex-lg-row {
          flex-direction: row !important;
        }

        .flex-lg-column {
          flex-direction: column !important;
        }

        .flex-lg-row-reverse {
          flex-direction: row-reverse !important;
        }

        .flex-lg-column-reverse {
          flex-direction: column-reverse !important;
        }

        .flex-lg-wrap {
          flex-wrap: wrap !important;
        }

        .flex-lg-nowrap {
          flex-wrap: nowrap !important;
        }

        .flex-lg-wrap-reverse {
          flex-wrap: wrap-reverse !important;
        }

        .flex-lg-fill {
          flex: 1 1 auto !important;
        }

        .flex-lg-grow-0 {
          flex-grow: 0 !important;
        }

        .flex-lg-grow-1 {
          flex-grow: 1 !important;
        }

        .flex-lg-shrink-0 {
          flex-shrink: 0 !important;
        }

        .flex-lg-shrink-1 {
          flex-shrink: 1 !important;
        }

        .justify-content-lg-start {
          justify-content: flex-start !important;
        }

        .justify-content-lg-end {
          justify-content: flex-end !important;
        }

        .justify-content-lg-center {
          justify-content: center !important;
        }

        .justify-content-lg-between {
          justify-content: space-between !important;
        }

        .justify-content-lg-around {
          justify-content: space-around !important;
        }

        .align-items-lg-start {
          align-items: flex-start !important;
        }

        .align-items-lg-end {
          align-items: flex-end !important;
        }

        .align-items-lg-center {
          align-items: center !important;
        }

        .align-items-lg-baseline {
          align-items: baseline !important;
        }

        .align-items-lg-stretch {
          align-items: stretch !important;
        }

        .align-content-lg-start {
          align-content: flex-start !important;
        }

        .align-content-lg-end {
          align-content: flex-end !important;
        }

        .align-content-lg-center {
          align-content: center !important;
        }

        .align-content-lg-between {
          align-content: space-between !important;
        }

        .align-content-lg-around {
          align-content: space-around !important;
        }

        .align-content-lg-stretch {
          align-content: stretch !important;
        }

        .align-self-lg-auto {
          align-self: auto !important;
        }

        .align-self-lg-start {
          align-self: flex-start !important;
        }

        .align-self-lg-end {
          align-self: flex-end !important;
        }

        .align-self-lg-center {
          align-self: center !important;
        }

        .align-self-lg-baseline {
          align-self: baseline !important;
        }

        .align-self-lg-stretch {
          align-self: stretch !important;
        }
      }

      @media (min-width: 1300px) {
        .flex-xl-row {
          flex-direction: row !important;
        }

        .flex-xl-column {
          flex-direction: column !important;
        }

        .flex-xl-row-reverse {
          flex-direction: row-reverse !important;
        }

        .flex-xl-column-reverse {
          flex-direction: column-reverse !important;
        }

        .flex-xl-wrap {
          flex-wrap: wrap !important;
        }

        .flex-xl-nowrap {
          flex-wrap: nowrap !important;
        }

        .flex-xl-wrap-reverse {
          flex-wrap: wrap-reverse !important;
        }

        .flex-xl-fill {
          flex: 1 1 auto !important;
        }

        .flex-xl-grow-0 {
          flex-grow: 0 !important;
        }

        .flex-xl-grow-1 {
          flex-grow: 1 !important;
        }

        .flex-xl-shrink-0 {
          flex-shrink: 0 !important;
        }

        .flex-xl-shrink-1 {
          flex-shrink: 1 !important;
        }

        .justify-content-xl-start {
          justify-content: flex-start !important;
        }

        .justify-content-xl-end {
          justify-content: flex-end !important;
        }

        .justify-content-xl-center {
          justify-content: center !important;
        }

        .justify-content-xl-between {
          justify-content: space-between !important;
        }

        .justify-content-xl-around {
          justify-content: space-around !important;
        }

        .align-items-xl-start {
          align-items: flex-start !important;
        }

        .align-items-xl-end {
          align-items: flex-end !important;
        }

        .align-items-xl-center {
          align-items: center !important;
        }

        .align-items-xl-baseline {
          align-items: baseline !important;
        }

        .align-items-xl-stretch {
          align-items: stretch !important;
        }

        .align-content-xl-start {
          align-content: flex-start !important;
        }

        .align-content-xl-end {
          align-content: flex-end !important;
        }

        .align-content-xl-center {
          align-content: center !important;
        }

        .align-content-xl-between {
          align-content: space-between !important;
        }

        .align-content-xl-around {
          align-content: space-around !important;
        }

        .align-content-xl-stretch {
          align-content: stretch !important;
        }

        .align-self-xl-auto {
          align-self: auto !important;
        }

        .align-self-xl-start {
          align-self: flex-start !important;
        }

        .align-self-xl-end {
          align-self: flex-end !important;
        }

        .align-self-xl-center {
          align-self: center !important;
        }

        .align-self-xl-baseline {
          align-self: baseline !important;
        }

        .align-self-xl-stretch {
          align-self: stretch !important;
        }
      }

      .float-left {
        float: left !important;
      }

      .float-right {
        float: right !important;
      }

      .float-none {
        float: none !important;
      }

      @media (min-width: 576px) {
        .float-sm-left {
          float: left !important;
        }

        .float-sm-right {
          float: right !important;
        }

        .float-sm-none {
          float: none !important;
        }
      }

      @media (min-width: 768px) {
        .float-md-left {
          float: left !important;
        }

        .float-md-right {
          float: right !important;
        }

        .float-md-none {
          float: none !important;
        }
      }

      @media (min-width: 992px) {
        .float-lg-left {
          float: left !important;
        }

        .float-lg-right {
          float: right !important;
        }

        .float-lg-none {
          float: none !important;
        }
      }

      @media (min-width: 1300px) {
        .float-xl-left {
          float: left !important;
        }

        .float-xl-right {
          float: right !important;
        }

        .float-xl-none {
          float: none !important;
        }
      }

      .position-static {
        position: static !important;
      }

      .position-relative {
        position: relative !important;
      }

      .position-absolute {
        position: absolute !important;
      }

      .position-fixed {
        position: fixed !important;
      }

      .position-sticky {
        position: -webkit-sticky !important;
        position: sticky !important;
      }

      .fixed-top {
        top: 0;
      }

      .fixed-bottom,
      .fixed-top {
        position: fixed;
        right: 0;
        left: 0;
        z-index: 1030;
      }

      .fixed-bottom {
        bottom: 0;
      }

      @supports ((position: -webkit-sticky) or (position: sticky)) {
        .sticky-top {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          z-index: 1020;
        }
      }

      .sr-only {
        white-space: nowrap;
      }

      .sr-only-focusable:active,
      .sr-only-focusable:focus {
        white-space: normal;
      }

      .shadow-sm {
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
      }

      .shadow {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
      }

      .shadow-lg {
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
      }

      .shadow-none {
        box-shadow: none !important;
      }

      .w-25 {
        width: 25% !important;
      }

      .w-50 {
        width: 50% !important;
      }

      .w-75 {
        width: 75% !important;
      }

      .w-100 {
        width: 100% !important;
      }

      .w-auto {
        width: auto !important;
      }

      .h-25 {
        height: 25% !important;
      }

      .h-50 {
        height: 50% !important;
      }

      .h-75 {
        height: 75% !important;
      }

      .h-100 {
        height: 100% !important;
      }

      .h-auto {
        height: auto !important;
      }

      .mw-100 {
        max-width: 100% !important;
      }

      .mh-100 {
        max-height: 100% !important;
      }

      .m-0 {
        margin: 0 !important;
      }

      .mt-0,
      .my-0 {
        margin-top: 0 !important;
      }

      .mr-0,
      .mx-0 {
        margin-right: 0 !important;
      }

      .mb-0,
      .my-0 {
        margin-bottom: 0 !important;
      }

      .ml-0,
      .mx-0 {
        margin-left: 0 !important;
      }

      .m-1 {
        margin: 0.25rem !important;
      }

      .mt-1,
      .my-1 {
        margin-top: 0.25rem !important;
      }

      .mr-1,
      .mx-1 {
        margin-right: 0.25rem !important;
      }

      .mb-1,
      .my-1 {
        margin-bottom: 0.25rem !important;
      }

      .ml-1,
      .mx-1 {
        margin-left: 0.25rem !important;
      }

      .m-2 {
        margin: 0.5rem !important;
      }

      .mt-2,
      .my-2 {
        margin-top: 0.5rem !important;
      }

      .mr-2,
      .mx-2 {
        margin-right: 0.5rem !important;
      }

      .mb-2,
      .my-2 {
        margin-bottom: 0.5rem !important;
      }

      .ml-2,
      .mx-2 {
        margin-left: 0.5rem !important;
      }

      .m-3 {
        margin: 1rem !important;
      }

      .mt-3,
      .my-3 {
        margin-top: 1rem !important;
      }

      .mr-3,
      .mx-3 {
        margin-right: 1rem !important;
      }

      .mb-3,
      .my-3 {
        margin-bottom: 1rem !important;
      }

      .ml-3,
      .mx-3 {
        margin-left: 1rem !important;
      }

      .m-4 {
        margin: 1.5rem !important;
      }

      .mt-4,
      .my-4 {
        margin-top: 1.5rem !important;
      }

      .mr-4,
      .mx-4 {
        margin-right: 1.5rem !important;
      }

      .mb-4,
      .my-4 {
        margin-bottom: 1.5rem !important;
      }

      .ml-4,
      .mx-4 {
        margin-left: 1.5rem !important;
      }

      .m-5 {
        margin: 3rem !important;
      }

      .mt-5,
      .my-5 {
        margin-top: 3rem !important;
      }

      .mr-5,
      .mx-5 {
        margin-right: 3rem !important;
      }

      .mb-5,
      .my-5 {
        margin-bottom: 3rem !important;
      }

      .ml-5,
      .mx-5 {
        margin-left: 3rem !important;
      }

      .p-0 {
        padding: 0 !important;
      }

      .pt-0,
      .py-0 {
        padding-top: 0 !important;
      }

      .pr-0,
      .px-0 {
        padding-right: 0 !important;
      }

      .pb-0,
      .py-0 {
        padding-bottom: 0 !important;
      }

      .pl-0,
      .px-0 {
        padding-left: 0 !important;
      }

      .p-1 {
        padding: 0.25rem !important;
      }

      .pt-1,
      .py-1 {
        padding-top: 0.25rem !important;
      }

      .pr-1,
      .px-1 {
        padding-right: 0.25rem !important;
      }

      .pb-1,
      .py-1 {
        padding-bottom: 0.25rem !important;
      }

      .pl-1,
      .px-1 {
        padding-left: 0.25rem !important;
      }

      .p-2 {
        padding: 0.5rem !important;
      }

      .pt-2,
      .py-2 {
        padding-top: 0.5rem !important;
      }

      .pr-2,
      .px-2 {
        padding-right: 0.5rem !important;
      }

      .pb-2,
      .py-2 {
        padding-bottom: 0.5rem !important;
      }

      .pl-2,
      .px-2 {
        padding-left: 0.5rem !important;
      }

      .p-3 {
        padding: 1rem !important;
      }

      .pt-3,
      .py-3 {
        padding-top: 1rem !important;
      }

      .pr-3,
      .px-3 {
        padding-right: 1rem !important;
      }

      .pb-3,
      .py-3 {
        padding-bottom: 1rem !important;
      }

      .pl-3,
      .px-3 {
        padding-left: 1rem !important;
      }

      .p-4 {
        padding: 1.5rem !important;
      }

      .pt-4,
      .py-4 {
        padding-top: 1.5rem !important;
      }

      .pr-4,
      .px-4 {
        padding-right: 1.5rem !important;
      }

      .pb-4,
      .py-4 {
        padding-bottom: 1.5rem !important;
      }

      .pl-4,
      .px-4 {
        padding-left: 1.5rem !important;
      }

      .p-5 {
        padding: 3rem !important;
      }

      .pt-5,
      .py-5 {
        padding-top: 3rem !important;
      }

      .pr-5,
      .px-5 {
        padding-right: 3rem !important;
      }

      .pb-5,
      .py-5 {
        padding-bottom: 3rem !important;
      }

      .pl-5,
      .px-5 {
        padding-left: 3rem !important;
      }

      .m-auto {
        margin: auto !important;
      }

      .mt-auto,
      .my-auto {
        margin-top: auto !important;
      }

      .mr-auto,
      .mx-auto {
        margin-right: auto !important;
      }

      .mb-auto,
      .my-auto {
        margin-bottom: auto !important;
      }

      .ml-auto,
      .mx-auto {
        margin-left: auto !important;
      }

      @media (min-width: 576px) {
        .m-sm-0 {
          margin: 0 !important;
        }

        .mt-sm-0,
        .my-sm-0 {
          margin-top: 0 !important;
        }

        .mr-sm-0,
        .mx-sm-0 {
          margin-right: 0 !important;
        }

        .mb-sm-0,
        .my-sm-0 {
          margin-bottom: 0 !important;
        }

        .ml-sm-0,
        .mx-sm-0 {
          margin-left: 0 !important;
        }

        .m-sm-1 {
          margin: 0.25rem !important;
        }

        .mt-sm-1,
        .my-sm-1 {
          margin-top: 0.25rem !important;
        }

        .mr-sm-1,
        .mx-sm-1 {
          margin-right: 0.25rem !important;
        }

        .mb-sm-1,
        .my-sm-1 {
          margin-bottom: 0.25rem !important;
        }

        .ml-sm-1,
        .mx-sm-1 {
          margin-left: 0.25rem !important;
        }

        .m-sm-2 {
          margin: 0.5rem !important;
        }

        .mt-sm-2,
        .my-sm-2 {
          margin-top: 0.5rem !important;
        }

        .mr-sm-2,
        .mx-sm-2 {
          margin-right: 0.5rem !important;
        }

        .mb-sm-2,
        .my-sm-2 {
          margin-bottom: 0.5rem !important;
        }

        .ml-sm-2,
        .mx-sm-2 {
          margin-left: 0.5rem !important;
        }

        .m-sm-3 {
          margin: 1rem !important;
        }

        .mt-sm-3,
        .my-sm-3 {
          margin-top: 1rem !important;
        }

        .mr-sm-3,
        .mx-sm-3 {
          margin-right: 1rem !important;
        }

        .mb-sm-3,
        .my-sm-3 {
          margin-bottom: 1rem !important;
        }

        .ml-sm-3,
        .mx-sm-3 {
          margin-left: 1rem !important;
        }

        .m-sm-4 {
          margin: 1.5rem !important;
        }

        .mt-sm-4,
        .my-sm-4 {
          margin-top: 1.5rem !important;
        }

        .mr-sm-4,
        .mx-sm-4 {
          margin-right: 1.5rem !important;
        }

        .mb-sm-4,
        .my-sm-4 {
          margin-bottom: 1.5rem !important;
        }

        .ml-sm-4,
        .mx-sm-4 {
          margin-left: 1.5rem !important;
        }

        .m-sm-5 {
          margin: 3rem !important;
        }

        .mt-sm-5,
        .my-sm-5 {
          margin-top: 3rem !important;
        }

        .mr-sm-5,
        .mx-sm-5 {
          margin-right: 3rem !important;
        }

        .mb-sm-5,
        .my-sm-5 {
          margin-bottom: 3rem !important;
        }

        .ml-sm-5,
        .mx-sm-5 {
          margin-left: 3rem !important;
        }

        .p-sm-0 {
          padding: 0 !important;
        }

        .pt-sm-0,
        .py-sm-0 {
          padding-top: 0 !important;
        }

        .pr-sm-0,
        .px-sm-0 {
          padding-right: 0 !important;
        }

        .pb-sm-0,
        .py-sm-0 {
          padding-bottom: 0 !important;
        }

        .pl-sm-0,
        .px-sm-0 {
          padding-left: 0 !important;
        }

        .p-sm-1 {
          padding: 0.25rem !important;
        }

        .pt-sm-1,
        .py-sm-1 {
          padding-top: 0.25rem !important;
        }

        .pr-sm-1,
        .px-sm-1 {
          padding-right: 0.25rem !important;
        }

        .pb-sm-1,
        .py-sm-1 {
          padding-bottom: 0.25rem !important;
        }

        .pl-sm-1,
        .px-sm-1 {
          padding-left: 0.25rem !important;
        }

        .p-sm-2 {
          padding: 0.5rem !important;
        }

        .pt-sm-2,
        .py-sm-2 {
          padding-top: 0.5rem !important;
        }

        .pr-sm-2,
        .px-sm-2 {
          padding-right: 0.5rem !important;
        }

        .pb-sm-2,
        .py-sm-2 {
          padding-bottom: 0.5rem !important;
        }

        .pl-sm-2,
        .px-sm-2 {
          padding-left: 0.5rem !important;
        }

        .p-sm-3 {
          padding: 1rem !important;
        }

        .pt-sm-3,
        .py-sm-3 {
          padding-top: 1rem !important;
        }

        .pr-sm-3,
        .px-sm-3 {
          padding-right: 1rem !important;
        }

        .pb-sm-3,
        .py-sm-3 {
          padding-bottom: 1rem !important;
        }

        .pl-sm-3,
        .px-sm-3 {
          padding-left: 1rem !important;
        }

        .p-sm-4 {
          padding: 1.5rem !important;
        }

        .pt-sm-4,
        .py-sm-4 {
          padding-top: 1.5rem !important;
        }

        .pr-sm-4,
        .px-sm-4 {
          padding-right: 1.5rem !important;
        }

        .pb-sm-4,
        .py-sm-4 {
          padding-bottom: 1.5rem !important;
        }

        .pl-sm-4,
        .px-sm-4 {
          padding-left: 1.5rem !important;
        }

        .p-sm-5 {
          padding: 3rem !important;
        }

        .pt-sm-5,
        .py-sm-5 {
          padding-top: 3rem !important;
        }

        .pr-sm-5,
        .px-sm-5 {
          padding-right: 3rem !important;
        }

        .pb-sm-5,
        .py-sm-5 {
          padding-bottom: 3rem !important;
        }

        .pl-sm-5,
        .px-sm-5 {
          padding-left: 3rem !important;
        }

        .m-sm-auto {
          margin: auto !important;
        }

        .mt-sm-auto,
        .my-sm-auto {
          margin-top: auto !important;
        }

        .mr-sm-auto,
        .mx-sm-auto {
          margin-right: auto !important;
        }

        .mb-sm-auto,
        .my-sm-auto {
          margin-bottom: auto !important;
        }

        .ml-sm-auto,
        .mx-sm-auto {
          margin-left: auto !important;
        }
      }

      @media (min-width: 768px) {
        .m-md-0 {
          margin: 0 !important;
        }

        .mt-md-0,
        .my-md-0 {
          margin-top: 0 !important;
        }

        .mr-md-0,
        .mx-md-0 {
          margin-right: 0 !important;
        }

        .mb-md-0,
        .my-md-0 {
          margin-bottom: 0 !important;
        }

        .ml-md-0,
        .mx-md-0 {
          margin-left: 0 !important;
        }

        .m-md-1 {
          margin: 0.25rem !important;
        }

        .mt-md-1,
        .my-md-1 {
          margin-top: 0.25rem !important;
        }

        .mr-md-1,
        .mx-md-1 {
          margin-right: 0.25rem !important;
        }

        .mb-md-1,
        .my-md-1 {
          margin-bottom: 0.25rem !important;
        }

        .ml-md-1,
        .mx-md-1 {
          margin-left: 0.25rem !important;
        }

        .m-md-2 {
          margin: 0.5rem !important;
        }

        .mt-md-2,
        .my-md-2 {
          margin-top: 0.5rem !important;
        }

        .mr-md-2,
        .mx-md-2 {
          margin-right: 0.5rem !important;
        }

        .mb-md-2,
        .my-md-2 {
          margin-bottom: 0.5rem !important;
        }

        .ml-md-2,
        .mx-md-2 {
          margin-left: 0.5rem !important;
        }

        .m-md-3 {
          margin: 1rem !important;
        }

        .mt-md-3,
        .my-md-3 {
          margin-top: 1rem !important;
        }

        .mr-md-3,
        .mx-md-3 {
          margin-right: 1rem !important;
        }

        .mb-md-3,
        .my-md-3 {
          margin-bottom: 1rem !important;
        }

        .ml-md-3,
        .mx-md-3 {
          margin-left: 1rem !important;
        }

        .m-md-4 {
          margin: 1.5rem !important;
        }

        .mt-md-4,
        .my-md-4 {
          margin-top: 1.5rem !important;
        }

        .mr-md-4,
        .mx-md-4 {
          margin-right: 1.5rem !important;
        }

        .mb-md-4,
        .my-md-4 {
          margin-bottom: 1.5rem !important;
        }

        .ml-md-4,
        .mx-md-4 {
          margin-left: 1.5rem !important;
        }

        .m-md-5 {
          margin: 3rem !important;
        }

        .mt-md-5,
        .my-md-5 {
          margin-top: 3rem !important;
        }

        .mr-md-5,
        .mx-md-5 {
          margin-right: 3rem !important;
        }

        .mb-md-5,
        .my-md-5 {
          margin-bottom: 3rem !important;
        }

        .ml-md-5,
        .mx-md-5 {
          margin-left: 3rem !important;
        }

        .p-md-0 {
          padding: 0 !important;
        }

        .pt-md-0,
        .py-md-0 {
          padding-top: 0 !important;
        }

        .pr-md-0,
        .px-md-0 {
          padding-right: 0 !important;
        }

        .pb-md-0,
        .py-md-0 {
          padding-bottom: 0 !important;
        }

        .pl-md-0,
        .px-md-0 {
          padding-left: 0 !important;
        }

        .p-md-1 {
          padding: 0.25rem !important;
        }

        .pt-md-1,
        .py-md-1 {
          padding-top: 0.25rem !important;
        }

        .pr-md-1,
        .px-md-1 {
          padding-right: 0.25rem !important;
        }

        .pb-md-1,
        .py-md-1 {
          padding-bottom: 0.25rem !important;
        }

        .pl-md-1,
        .px-md-1 {
          padding-left: 0.25rem !important;
        }

        .p-md-2 {
          padding: 0.5rem !important;
        }

        .pt-md-2,
        .py-md-2 {
          padding-top: 0.5rem !important;
        }

        .pr-md-2,
        .px-md-2 {
          padding-right: 0.5rem !important;
        }

        .pb-md-2,
        .py-md-2 {
          padding-bottom: 0.5rem !important;
        }

        .pl-md-2,
        .px-md-2 {
          padding-left: 0.5rem !important;
        }

        .p-md-3 {
          padding: 1rem !important;
        }

        .pt-md-3,
        .py-md-3 {
          padding-top: 1rem !important;
        }

        .pr-md-3,
        .px-md-3 {
          padding-right: 1rem !important;
        }

        .pb-md-3,
        .py-md-3 {
          padding-bottom: 1rem !important;
        }

        .pl-md-3,
        .px-md-3 {
          padding-left: 1rem !important;
        }

        .p-md-4 {
          padding: 1.5rem !important;
        }

        .pt-md-4,
        .py-md-4 {
          padding-top: 1.5rem !important;
        }

        .pr-md-4,
        .px-md-4 {
          padding-right: 1.5rem !important;
        }

        .pb-md-4,
        .py-md-4 {
          padding-bottom: 1.5rem !important;
        }

        .pl-md-4,
        .px-md-4 {
          padding-left: 1.5rem !important;
        }

        .p-md-5 {
          padding: 3rem !important;
        }

        .pt-md-5,
        .py-md-5 {
          padding-top: 3rem !important;
        }

        .pr-md-5,
        .px-md-5 {
          padding-right: 3rem !important;
        }

        .pb-md-5,
        .py-md-5 {
          padding-bottom: 3rem !important;
        }

        .pl-md-5,
        .px-md-5 {
          padding-left: 3rem !important;
        }

        .m-md-auto {
          margin: auto !important;
        }

        .mt-md-auto,
        .my-md-auto {
          margin-top: auto !important;
        }

        .mr-md-auto,
        .mx-md-auto {
          margin-right: auto !important;
        }

        .mb-md-auto,
        .my-md-auto {
          margin-bottom: auto !important;
        }

        .ml-md-auto,
        .mx-md-auto {
          margin-left: auto !important;
        }
      }

      @media (min-width: 992px) {
        .m-lg-0 {
          margin: 0 !important;
        }

        .mt-lg-0,
        .my-lg-0 {
          margin-top: 0 !important;
        }

        .mr-lg-0,
        .mx-lg-0 {
          margin-right: 0 !important;
        }

        .mb-lg-0,
        .my-lg-0 {
          margin-bottom: 0 !important;
        }

        .ml-lg-0,
        .mx-lg-0 {
          margin-left: 0 !important;
        }

        .m-lg-1 {
          margin: 0.25rem !important;
        }

        .mt-lg-1,
        .my-lg-1 {
          margin-top: 0.25rem !important;
        }

        .mr-lg-1,
        .mx-lg-1 {
          margin-right: 0.25rem !important;
        }

        .mb-lg-1,
        .my-lg-1 {
          margin-bottom: 0.25rem !important;
        }

        .ml-lg-1,
        .mx-lg-1 {
          margin-left: 0.25rem !important;
        }

        .m-lg-2 {
          margin: 0.5rem !important;
        }

        .mt-lg-2,
        .my-lg-2 {
          margin-top: 0.5rem !important;
        }

        .mr-lg-2,
        .mx-lg-2 {
          margin-right: 0.5rem !important;
        }

        .mb-lg-2,
        .my-lg-2 {
          margin-bottom: 0.5rem !important;
        }

        .ml-lg-2,
        .mx-lg-2 {
          margin-left: 0.5rem !important;
        }

        .m-lg-3 {
          margin: 1rem !important;
        }

        .mt-lg-3,
        .my-lg-3 {
          margin-top: 1rem !important;
        }

        .mr-lg-3,
        .mx-lg-3 {
          margin-right: 1rem !important;
        }

        .mb-lg-3,
        .my-lg-3 {
          margin-bottom: 1rem !important;
        }

        .ml-lg-3,
        .mx-lg-3 {
          margin-left: 1rem !important;
        }

        .m-lg-4 {
          margin: 1.5rem !important;
        }

        .mt-lg-4,
        .my-lg-4 {
          margin-top: 1.5rem !important;
        }

        .mr-lg-4,
        .mx-lg-4 {
          margin-right: 1.5rem !important;
        }

        .mb-lg-4,
        .my-lg-4 {
          margin-bottom: 1.5rem !important;
        }

        .ml-lg-4,
        .mx-lg-4 {
          margin-left: 1.5rem !important;
        }

        .m-lg-5 {
          margin: 3rem !important;
        }

        .mt-lg-5,
        .my-lg-5 {
          margin-top: 3rem !important;
        }

        .mr-lg-5,
        .mx-lg-5 {
          margin-right: 3rem !important;
        }

        .mb-lg-5,
        .my-lg-5 {
          margin-bottom: 3rem !important;
        }

        .ml-lg-5,
        .mx-lg-5 {
          margin-left: 3rem !important;
        }

        .p-lg-0 {
          padding: 0 !important;
        }

        .pt-lg-0,
        .py-lg-0 {
          padding-top: 0 !important;
        }

        .pr-lg-0,
        .px-lg-0 {
          padding-right: 0 !important;
        }

        .pb-lg-0,
        .py-lg-0 {
          padding-bottom: 0 !important;
        }

        .pl-lg-0,
        .px-lg-0 {
          padding-left: 0 !important;
        }

        .p-lg-1 {
          padding: 0.25rem !important;
        }

        .pt-lg-1,
        .py-lg-1 {
          padding-top: 0.25rem !important;
        }

        .pr-lg-1,
        .px-lg-1 {
          padding-right: 0.25rem !important;
        }

        .pb-lg-1,
        .py-lg-1 {
          padding-bottom: 0.25rem !important;
        }

        .pl-lg-1,
        .px-lg-1 {
          padding-left: 0.25rem !important;
        }

        .p-lg-2 {
          padding: 0.5rem !important;
        }

        .pt-lg-2,
        .py-lg-2 {
          padding-top: 0.5rem !important;
        }

        .pr-lg-2,
        .px-lg-2 {
          padding-right: 0.5rem !important;
        }

        .pb-lg-2,
        .py-lg-2 {
          padding-bottom: 0.5rem !important;
        }

        .pl-lg-2,
        .px-lg-2 {
          padding-left: 0.5rem !important;
        }

        .p-lg-3 {
          padding: 1rem !important;
        }

        .pt-lg-3,
        .py-lg-3 {
          padding-top: 1rem !important;
        }

        .pr-lg-3,
        .px-lg-3 {
          padding-right: 1rem !important;
        }

        .pb-lg-3,
        .py-lg-3 {
          padding-bottom: 1rem !important;
        }

        .pl-lg-3,
        .px-lg-3 {
          padding-left: 1rem !important;
        }

        .p-lg-4 {
          padding: 1.5rem !important;
        }

        .pt-lg-4,
        .py-lg-4 {
          padding-top: 1.5rem !important;
        }

        .pr-lg-4,
        .px-lg-4 {
          padding-right: 1.5rem !important;
        }

        .pb-lg-4,
        .py-lg-4 {
          padding-bottom: 1.5rem !important;
        }

        .pl-lg-4,
        .px-lg-4 {
          padding-left: 1.5rem !important;
        }

        .p-lg-5 {
          padding: 3rem !important;
        }

        .pt-lg-5,
        .py-lg-5 {
          padding-top: 3rem !important;
        }

        .pr-lg-5,
        .px-lg-5 {
          padding-right: 3rem !important;
        }

        .pb-lg-5,
        .py-lg-5 {
          padding-bottom: 3rem !important;
        }

        .pl-lg-5,
        .px-lg-5 {
          padding-left: 3rem !important;
        }

        .m-lg-auto {
          margin: auto !important;
        }

        .mt-lg-auto,
        .my-lg-auto {
          margin-top: auto !important;
        }

        .mr-lg-auto,
        .mx-lg-auto {
          margin-right: auto !important;
        }

        .mb-lg-auto,
        .my-lg-auto {
          margin-bottom: auto !important;
        }

        .ml-lg-auto,
        .mx-lg-auto {
          margin-left: auto !important;
        }
      }

      @media (min-width: 1300px) {
        .m-xl-0 {
          margin: 0 !important;
        }

        .mt-xl-0,
        .my-xl-0 {
          margin-top: 0 !important;
        }

        .mr-xl-0,
        .mx-xl-0 {
          margin-right: 0 !important;
        }

        .mb-xl-0,
        .my-xl-0 {
          margin-bottom: 0 !important;
        }

        .ml-xl-0,
        .mx-xl-0 {
          margin-left: 0 !important;
        }

        .m-xl-1 {
          margin: 0.25rem !important;
        }

        .mt-xl-1,
        .my-xl-1 {
          margin-top: 0.25rem !important;
        }

        .mr-xl-1,
        .mx-xl-1 {
          margin-right: 0.25rem !important;
        }

        .mb-xl-1,
        .my-xl-1 {
          margin-bottom: 0.25rem !important;
        }

        .ml-xl-1,
        .mx-xl-1 {
          margin-left: 0.25rem !important;
        }

        .m-xl-2 {
          margin: 0.5rem !important;
        }

        .mt-xl-2,
        .my-xl-2 {
          margin-top: 0.5rem !important;
        }

        .mr-xl-2,
        .mx-xl-2 {
          margin-right: 0.5rem !important;
        }

        .mb-xl-2,
        .my-xl-2 {
          margin-bottom: 0.5rem !important;
        }

        .ml-xl-2,
        .mx-xl-2 {
          margin-left: 0.5rem !important;
        }

        .m-xl-3 {
          margin: 1rem !important;
        }

        .mt-xl-3,
        .my-xl-3 {
          margin-top: 1rem !important;
        }

        .mr-xl-3,
        .mx-xl-3 {
          margin-right: 1rem !important;
        }

        .mb-xl-3,
        .my-xl-3 {
          margin-bottom: 1rem !important;
        }

        .ml-xl-3,
        .mx-xl-3 {
          margin-left: 1rem !important;
        }

        .m-xl-4 {
          margin: 1.5rem !important;
        }

        .mt-xl-4,
        .my-xl-4 {
          margin-top: 1.5rem !important;
        }

        .mr-xl-4,
        .mx-xl-4 {
          margin-right: 1.5rem !important;
        }

        .mb-xl-4,
        .my-xl-4 {
          margin-bottom: 1.5rem !important;
        }

        .ml-xl-4,
        .mx-xl-4 {
          margin-left: 1.5rem !important;
        }

        .m-xl-5 {
          margin: 3rem !important;
        }

        .mt-xl-5,
        .my-xl-5 {
          margin-top: 3rem !important;
        }

        .mr-xl-5,
        .mx-xl-5 {
          margin-right: 3rem !important;
        }

        .mb-xl-5,
        .my-xl-5 {
          margin-bottom: 3rem !important;
        }

        .ml-xl-5,
        .mx-xl-5 {
          margin-left: 3rem !important;
        }

        .p-xl-0 {
          padding: 0 !important;
        }

        .pt-xl-0,
        .py-xl-0 {
          padding-top: 0 !important;
        }

        .pr-xl-0,
        .px-xl-0 {
          padding-right: 0 !important;
        }

        .pb-xl-0,
        .py-xl-0 {
          padding-bottom: 0 !important;
        }

        .pl-xl-0,
        .px-xl-0 {
          padding-left: 0 !important;
        }

        .p-xl-1 {
          padding: 0.25rem !important;
        }

        .pt-xl-1,
        .py-xl-1 {
          padding-top: 0.25rem !important;
        }

        .pr-xl-1,
        .px-xl-1 {
          padding-right: 0.25rem !important;
        }

        .pb-xl-1,
        .py-xl-1 {
          padding-bottom: 0.25rem !important;
        }

        .pl-xl-1,
        .px-xl-1 {
          padding-left: 0.25rem !important;
        }

        .p-xl-2 {
          padding: 0.5rem !important;
        }

        .pt-xl-2,
        .py-xl-2 {
          padding-top: 0.5rem !important;
        }

        .pr-xl-2,
        .px-xl-2 {
          padding-right: 0.5rem !important;
        }

        .pb-xl-2,
        .py-xl-2 {
          padding-bottom: 0.5rem !important;
        }

        .pl-xl-2,
        .px-xl-2 {
          padding-left: 0.5rem !important;
        }

        .p-xl-3 {
          padding: 1rem !important;
        }

        .pt-xl-3,
        .py-xl-3 {
          padding-top: 1rem !important;
        }

        .pr-xl-3,
        .px-xl-3 {
          padding-right: 1rem !important;
        }

        .pb-xl-3,
        .py-xl-3 {
          padding-bottom: 1rem !important;
        }

        .pl-xl-3,
        .px-xl-3 {
          padding-left: 1rem !important;
        }

        .p-xl-4 {
          padding: 1.5rem !important;
        }

        .pt-xl-4,
        .py-xl-4 {
          padding-top: 1.5rem !important;
        }

        .pr-xl-4,
        .px-xl-4 {
          padding-right: 1.5rem !important;
        }

        .pb-xl-4,
        .py-xl-4 {
          padding-bottom: 1.5rem !important;
        }

        .pl-xl-4,
        .px-xl-4 {
          padding-left: 1.5rem !important;
        }

        .p-xl-5 {
          padding: 3rem !important;
        }

        .pt-xl-5,
        .py-xl-5 {
          padding-top: 3rem !important;
        }

        .pr-xl-5,
        .px-xl-5 {
          padding-right: 3rem !important;
        }

        .pb-xl-5,
        .py-xl-5 {
          padding-bottom: 3rem !important;
        }

        .pl-xl-5,
        .px-xl-5 {
          padding-left: 3rem !important;
        }

        .m-xl-auto {
          margin: auto !important;
        }

        .mt-xl-auto,
        .my-xl-auto {
          margin-top: auto !important;
        }

        .mr-xl-auto,
        .mx-xl-auto {
          margin-right: auto !important;
        }

        .mb-xl-auto,
        .my-xl-auto {
          margin-bottom: auto !important;
        }

        .ml-xl-auto,
        .mx-xl-auto {
          margin-left: auto !important;
        }
      }

      .text-monospace {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,
          Courier New, monospace;
      }

      .text-justify {
        text-align: justify !important;
      }

      .text-nowrap {
        white-space: nowrap !important;
      }

      .text-truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .text-left {
        text-align: left !important;
      }

      .text-right {
        text-align: right !important;
      }

      .text-center {
        text-align: center !important;
      }

      @media (min-width: 576px) {
        .text-sm-left {
          text-align: left !important;
        }

        .text-sm-right {
          text-align: right !important;
        }

        .text-sm-center {
          text-align: center !important;
        }
      }

      @media (min-width: 768px) {
        .text-md-left {
          text-align: left !important;
        }

        .text-md-right {
          text-align: right !important;
        }

        .text-md-center {
          text-align: center !important;
        }
      }

      @media (min-width: 992px) {
        .text-lg-left {
          text-align: left !important;
        }

        .text-lg-right {
          text-align: right !important;
        }

        .text-lg-center {
          text-align: center !important;
        }
      }

      @media (min-width: 1300px) {
        .text-xl-left {
          text-align: left !important;
        }

        .text-xl-right {
          text-align: right !important;
        }

        .text-xl-center {
          text-align: center !important;
        }
      }

      .text-lowercase {
        text-transform: lowercase !important;
      }

      .text-uppercase {
        text-transform: uppercase !important;
      }

      .text-capitalize {
        text-transform: capitalize !important;
      }

      .font-weight-light {
        font-weight: 300 !important;
      }

      .font-weight-normal {
        font-weight: 400 !important;
      }

      .font-weight-bold {
        font-weight: 700 !important;
      }

      .font-italic {
        font-style: italic !important;
      }

      .text-white {
        color: #fff !important;
      }

      .text-primary {
        color: #00afa0 !important;
      }

      a.text-primary:focus,
      a.text-primary:hover {
        color: #007c71 !important;
      }

      .text-secondary {
        color: #6c757d !important;
      }

      a.text-secondary:focus,
      a.text-secondary:hover {
        color: #545b62 !important;
      }

      .text-success {
        color: #28a745 !important;
      }

      a.text-success:focus,
      a.text-success:hover {
        color: #1e7e34 !important;
      }

      .text-info {
        color: #17a2b8 !important;
      }

      a.text-info:focus,
      a.text-info:hover {
        color: #117a8b !important;
      }

      .text-warning {
        color: #ffc107 !important;
      }

      a.text-warning:focus,
      a.text-warning:hover {
        color: #d39e00 !important;
      }

      .text-danger {
        color: #f26f6d !important;
      }

      a.text-danger:focus,
      a.text-danger:hover {
        color: #ee413e !important;
      }

      .text-light {
        color: #f8f9fa !important;
      }

      a.text-light:focus,
      a.text-light:hover {
        color: #dae0e5 !important;
      }

      .text-dark {
        color: #333 !important;
      }

      a.text-dark:focus,
      a.text-dark:hover {
        color: #1a1a1a !important;
      }

      .text-dark-gray {
        color: #9b9b9b !important;
      }

      a.text-dark-gray:focus,
      a.text-dark-gray:hover {
        color: #828282 !important;
      }

      .text-body {
        color: #212529 !important;
      }

      .text-muted {
        color: #6c757d !important;
      }

      .text-black-50 {
        color: rgba(0, 0, 0, 0.5) !important;
      }

      .text-white-50 {
        color: hsla(0, 0%, 100%, 0.5) !important;
      }

      .text-hide {
        font: 0/0 a;
        color: transparent;
        text-shadow: none;
        background-color: transparent;
        border: 0;
      }

      .visible {
        visibility: visible !important;
      }

      .invisible {
        visibility: hidden !important;
      }

      @media print {
        *,
        :after,
        :before {
          text-shadow: none !important;
          box-shadow: none !important;
        }

        a:not(.btn) {
          text-decoration: underline;
        }

        abbr[title]:after {
          content: " (" attr(title) ")";
        }

        pre {
          white-space: pre-wrap !important;
        }

        blockquote,
        pre {
          border: 1px solid #adb5bd;
          page-break-inside: avoid;
        }

        thead {
          display: table-header-group;
        }

        img,
        tr {
          page-break-inside: avoid;
        }

        h2,
        h3,
        p {
          orphans: 3;
          widows: 3;
        }

        h2,
        h3 {
          page-break-after: avoid;
        }

        @page {
          size: a3;
        }

        .container,
        body {
          min-width: 992px !important;
        }

        .navbar {
          display: none;
        }

        .badge {
          border: 1px solid #000;
        }

        .table {
          border-collapse: collapse !important;
        }

        .table td,
        .table th {
          background-color: #fff !important;
        }

        .table-bordered td,
        .table-bordered th {
          border: 1px solid #dee2e6 !important;
        }

        .table-dark {
          color: inherit;
        }

        .table-dark tbody + tbody,
        .table-dark td,
        .table-dark th,
        .table-dark thead th {
          border-color: #dee2e6;
        }

        .table .thead-dark th {
          color: inherit;
          border-color: #dee2e6;
        }
      }

      @-webkit-keyframes passing-through {
        0% {
          opacity: 0;
          -webkit-transform: translateY(40px);
          transform: translateY(40px);
        }

        30%,
        70% {
          opacity: 1;
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }

        to {
          opacity: 0;
          -webkit-transform: translateY(-40px);
          transform: translateY(-40px);
        }
      }

      @keyframes passing-through {
        0% {
          opacity: 0;
          -webkit-transform: translateY(40px);
          transform: translateY(40px);
        }

        30%,
        70% {
          opacity: 1;
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }

        to {
          opacity: 0;
          -webkit-transform: translateY(-40px);
          transform: translateY(-40px);
        }
      }

      @-webkit-keyframes slide-in {
        0% {
          opacity: 0;
          -webkit-transform: translateY(40px);
          transform: translateY(40px);
        }

        30% {
          opacity: 1;
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }
      }

      @keyframes slide-in {
        0% {
          opacity: 0;
          -webkit-transform: translateY(40px);
          transform: translateY(40px);
        }

        30% {
          opacity: 1;
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }
      }

      @-webkit-keyframes pulse {
        0% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }

        10% {
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }

        20% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }

      @keyframes pulse {
        0% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }

        10% {
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }

        20% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }

      .dropzone,
      .dropzone * {
        box-sizing: border-box;
      }

      .dropzone {
        min-height: 240px;
        background: #fff;
        padding: 9px 7px;
      }

      .dropzone.dz-clickable {
        cursor: pointer;
      }

      .dropzone.dz-clickable * {
        cursor: default;
      }

      .dropzone.dz-clickable .dz-message,
      .dropzone.dz-clickable .dz-message * {
        cursor: pointer;
      }

      .dropzone.dz-started .dz-message {
        display: none;
      }

      .dropzone.dz-drag-hover {
        border-style: solid;
      }

      .dropzone.dz-drag-hover .dz-message {
        opacity: 0.5;
      }

      .dropzone .dz-message {
        text-align: center;
        margin: 2em 0;
      }

      .dropzone .dz-preview {
        position: relative;
        display: inline-block;
        vertical-align: top;
        margin: 5px;
        min-height: 100px;
      }

      .dropzone .dz-preview:hover {
        z-index: 1000;
      }

      .dropzone .dz-preview.dz-file-preview .dz-image {
        border-radius: 20px;
        background: #999;
        background: linear-gradient(180deg, #eee, #ddd);
      }

      .dropzone .dz-preview.dz-file-preview .dz-details {
        opacity: 1;
      }

      .dropzone .dz-preview.dz-image-preview {
        background: #fff;
      }

      .dropzone .dz-preview.dz-image-preview .dz-details {
        transition: opacity 0.2s linear;
      }

      .dropzone .dz-preview .dz-remove {
        font-size: 14px;
        text-align: center;
        display: block;
        cursor: pointer;
        border: none;
      }

      .dropzone .dz-preview .dz-remove:hover {
        text-decoration: underline;
      }

      .dropzone .dz-preview:hover .dz-details {
        opacity: 1;
      }

      .dropzone .dz-preview .dz-details {
        z-index: 20;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        font-size: 13px;
        min-width: 100%;
        max-width: 100%;
        padding: 2em 1em;
        text-align: center;
        color: rgba(0, 0, 0, 0.9);
        line-height: 150%;
      }

      .dropzone .dz-preview .dz-details .dz-size {
        margin-bottom: 1em;
        font-size: 16px;
      }

      .dropzone .dz-preview .dz-details .dz-filename {
        white-space: nowrap;
      }

      .dropzone .dz-preview .dz-details .dz-filename:hover span {
        border: 1px solid hsla(0, 0%, 78%, 0.8);
        background-color: hsla(0, 0%, 100%, 0.8);
      }

      .dropzone .dz-preview .dz-details .dz-filename:not(:hover) {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
        border: 1px solid transparent;
      }

      .dropzone .dz-preview .dz-details .dz-filename span,
      .dropzone .dz-preview .dz-details .dz-size span {
        background-color: hsla(0, 0%, 100%, 0.4);
        padding: 0 0.4em;
        border-radius: 3px;
      }

      .dropzone .dz-preview:hover .dz-image img {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
        -webkit-filter: blur(8px);
        filter: blur(8px);
      }

      .dropzone .dz-preview .dz-image {
        border-radius: 20px;
        overflow: hidden;
        width: 120px;
        height: 120px;
        position: relative;
        display: block;
        z-index: 10;
      }

      .dropzone .dz-preview .dz-image img {
        display: block;
      }

      .dropzone .dz-preview.dz-success .dz-success-mark {
        -webkit-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
        animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
      }

      .dropzone .dz-preview.dz-error .dz-error-mark {
        opacity: 1;
        -webkit-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
        animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
      }

      .dropzone .dz-preview .dz-error-mark,
      .dropzone .dz-preview .dz-success-mark {
        pointer-events: none;
        opacity: 0;
        z-index: 500;
        position: absolute;
        display: block;
        top: 50%;
        left: 50%;
        margin-left: -27px;
        margin-top: -27px;
      }

      .dropzone .dz-preview .dz-error-mark svg,
      .dropzone .dz-preview .dz-success-mark svg {
        display: block;
        width: 54px;
        height: 54px;
      }

      .dropzone .dz-preview.dz-processing .dz-progress {
        opacity: 1;
        transition: all 0.2s linear;
      }

      .dropzone .dz-preview.dz-complete .dz-progress {
        opacity: 0;
        transition: opacity 0.4s ease-in;
      }

      .dropzone .dz-preview:not(.dz-processing) .dz-progress {
        -webkit-animation: pulse 6s ease infinite;
        animation: pulse 6s ease infinite;
      }

      .dropzone .dz-preview .dz-progress {
        opacity: 1;
        z-index: 1000;
        pointer-events: none;
        position: absolute;
        height: 16px;
        left: 50%;
        top: 50%;
        margin-top: -8px;
        width: 80px;
        margin-left: -40px;
        background: hsla(0, 0%, 100%, 0.9);
        -webkit-transform: scale(1);
        border-radius: 8px;
        overflow: hidden;
      }

      .dropzone .dz-preview .dz-progress .dz-upload {
        background: #333;
        background: linear-gradient(180deg, #666, #444);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 0;
        transition: width 0.3s ease-in-out;
      }

      .dropzone .dz-preview.dz-error .dz-error-message {
        display: block;
      }

      .dropzone .dz-preview.dz-error:hover .dz-error-message {
        opacity: 1;
        pointer-events: auto;
      }

      .dropzone .dz-preview .dz-error-message {
        pointer-events: none;
        z-index: 1000;
        position: absolute;
        display: block;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 8px;
        font-size: 13px;
        top: 130px;
        left: -10px;
        width: 140px;
        background: #be2626;
        background: linear-gradient(180deg, #be2626, #a92222);
        padding: 0.5em 1.2em;
        color: #fff;
      }

      .dropzone .dz-preview .dz-error-message:after {
        content: "";
        position: absolute;
        top: -6px;
        left: 64px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #be2626;
      }

      .vue-dropzone {
        border: 2px dotted #00afa0;
        letter-spacing: 0.2px;
        color: #777;
        transition: background-color 0.2s linear;
      }

      .vue-dropzone:hover {
        background-color: #f6f6f6;
      }

      .vue-dropzone i {
        color: #ccc;
      }

      .vue-dropzone .dz-preview .dz-image {
        border-radius: 0;
        width: 100%;
        height: 100%;
      }

      .vue-dropzone .dz-preview .dz-image img:not([src]) {
        width: 200px;
        height: 200px;
      }

      .vue-dropzone .dz-preview .dz-image:hover img {
        -webkit-transform: none;
        transform: none;
        -webkit-filter: none;
      }

      .vue-dropzone .dz-preview .dz-details {
        bottom: 0;
        top: 0;
        color: #fff;
        background-color: rgba(33, 150, 243, 0.8);
        transition: opacity 0.2s linear;
        text-align: left;
      }

      .vue-dropzone .dz-preview .dz-details .dz-filename {
        overflow: hidden;
      }

      .vue-dropzone .dz-preview .dz-details .dz-filename span,
      .vue-dropzone .dz-preview .dz-details .dz-size span {
        background-color: transparent;
      }

      .vue-dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
        border: none;
      }

      .vue-dropzone .dz-preview .dz-details .dz-filename:hover span {
        background-color: transparent;
        border: none;
      }

      .vue-dropzone .dz-preview .dz-progress .dz-upload {
        background: #ccc;
      }

      .vue-dropzone .dz-preview .dz-remove {
        position: absolute;
        z-index: 30;
        color: #fff;
        margin-left: 15px;
        padding: 10px;
        top: inherit;
        bottom: 15px;
        border: 2px solid #fff;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 1.1px;
        opacity: 0;
      }

      .vue-dropzone .dz-preview:hover .dz-remove {
        opacity: 1;
      }

      .vue-dropzone .dz-preview .dz-error-mark,
      .vue-dropzone .dz-preview .dz-success-mark {
        margin-left: auto;
        margin-top: auto;
        width: 100%;
        top: 35%;
        left: 0;
      }

      .vue-dropzone .dz-preview .dz-error-mark svg,
      .vue-dropzone .dz-preview .dz-success-mark svg {
        margin-left: auto;
        margin-right: auto;
      }

      .vue-dropzone .dz-preview .dz-error-message {
        top: 15%;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        width: 100%;
      }

      .vue-dropzone .dz-preview .dz-error-message:after {
        bottom: -6px;
        top: auto;
        border-top: 6px solid #a92222;
        border-bottom: none;
      }

      /*!
     *  Font Awesome 4.7.0 by @davegandy - http://MaterialCommunityIcons.io - @MaterialCommunityIcons
     *  License - http://MaterialCommunityIcons.io/license (Font: SIL OFL 1.1, CSS: MIT License)
     */

      @font-face {
        font-family: MaterialCommunityIcons;
        src: url(/_nuxt/fonts/MaterialCommunityIcons-webfont.674f50d.eot);
        src: url(/_nuxt/fonts/MaterialCommunityIcons-webfont.674f50d.eot?#iefix&v=4.7.0)
            format("embedded-opentype"),
          url(/_nuxt/fonts/MaterialCommunityIcons-webfont.af7ae50.woff2)
            format("woff2"),
          url(/_nuxt/fonts/MaterialCommunityIcons-webfont.fee66e7.woff)
            format("woff"),
          url(/_nuxt/fonts/MaterialCommunityIcons-webfont.b06871f.ttf)
            format("truetype"),
          url(/_nuxt/img/MaterialCommunityIcons-webfont.912ec66.svg#MaterialCommunityIconsregular)
            format("svg");
        font-weight: 400;
        font-style: normal;
      }

      .fa {
        display: inline-block;
        font: normal normal normal 14px/1 MaterialCommunityIcons;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .fa-lg {
        font-size: 1.33333em;
        line-height: 0.75em;
        vertical-align: -15%;
      }

      .fa-2x {
        font-size: 2em;
      }

      .fa-3x {
        font-size: 3em;
      }

      .fa-4x {
        font-size: 4em;
      }

      .fa-5x {
        font-size: 5em;
      }

      .fa-fw {
        width: 1.28571em;
        text-align: center;
      }

      .fa-ul {
        padding-left: 0;
        margin-left: 2.14286em;
        list-style-type: none;
      }

      .fa-ul > li {
        position: relative;
      }

      .fa-li {
        position: absolute;
        left: -2.14286em;
        width: 2.14286em;
        top: 0.14286em;
        text-align: center;
      }

      .fa-li.fa-lg {
        left: -1.85714em;
      }

      .fa-border {
        padding: 0.2em 0.25em 0.15em;
        border: 0.08em solid #eee;
        border-radius: 0.1em;
      }

      .fa-pull-left {
        float: left;
      }

      .fa-pull-right {
        float: right;
      }

      .fa.fa-pull-left {
        margin-right: 0.3em;
      }

      .fa.fa-pull-right {
        margin-left: 0.3em;
      }

      .pull-right {
        float: right;
      }

      .pull-left {
        float: left;
      }

      .fa.pull-left {
        margin-right: 0.3em;
      }

      .fa.pull-right {
        margin-left: 0.3em;
      }

      .fa-spin {
        -webkit-animation: fa-spin 2s infinite linear;
        animation: fa-spin 2s infinite linear;
      }

      .fa-pulse {
        -webkit-animation: fa-spin 1s infinite steps(8);
        animation: fa-spin 1s infinite steps(8);
      }

      @-webkit-keyframes fa-spin {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }

        to {
          -webkit-transform: rotate(359deg);
          transform: rotate(359deg);
        }
      }

      @keyframes fa-spin {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }

        to {
          -webkit-transform: rotate(359deg);
          transform: rotate(359deg);
        }
      }

      .fa-rotate-90 {
        -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }

      .fa-rotate-180 {
        -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }

      .fa-rotate-270 {
        -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
      }

      .fa-flip-horizontal {
        -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
      }

      .fa-flip-vertical {
        -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
        -webkit-transform: scaleY(-1);
        transform: scaleY(-1);
      }

      :root .fa-flip-horizontal,
      :root .fa-flip-vertical,
      :root .fa-rotate-90,
      :root .fa-rotate-180,
      :root .fa-rotate-270 {
        -webkit-filter: none;
        filter: none;
      }

      .fa-stack {
        position: relative;
        display: inline-block;
        width: 2em;
        height: 2em;
        line-height: 2em;
        vertical-align: middle;
      }

      .fa-stack-1x,
      .fa-stack-2x {
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
      }

      .fa-stack-1x {
        line-height: inherit;
      }

      .fa-stack-2x {
        font-size: 2em;
      }

      .fa-inverse {
        color: #fff;
      }

      .fa-glass:before {
        content: "\\F000";
      }

      .fa-music:before {
        content: "\\F001";
      }

      .fa-search:before {
        content: "\\F002";
      }

      .fa-envelope-o:before {
        content: "\\F003";
      }

      .fa-heart:before {
        content: "\\F004";
      }

      .fa-star:before {
        content: "\\F005";
      }

      .fa-star-o:before {
        content: "\\F006";
      }

      .fa-user:before {
        content: "\\F007";
      }

      .fa-film:before {
        content: "\\F008";
      }

      .fa-th-large:before {
        content: "\\F009";
      }

      .fa-th:before {
        content: "\\F00A";
      }

      .fa-th-list:before {
        content: "\\F00B";
      }

      .fa-check:before {
        content: "\\F00C";
      }

      .fa-close:before,
      .fa-remove:before,
      .fa-times:before {
        content: "\\F00D";
      }

      .fa-search-plus:before {
        content: "\\F00E";
      }

      .fa-search-minus:before {
        content: "\\F010";
      }

      .fa-power-off:before {
        content: "\\F011";
      }

      .fa-signal:before {
        content: "\\F012";
      }

      .fa-cog:before,
      .fa-gear:before {
        content: "\\F013";
      }

      .fa-trash-o:before {
        content: "\\F014";
      }

      .fa-home:before {
        content: "\\F015";
      }

      .fa-file-o:before {
        content: "\\F016";
      }

      .fa-clock-o:before {
        content: "\\F017";
      }

      .fa-road:before {
        content: "\\F018";
      }

      .fa-download:before {
        content: "\\F019";
      }

      .fa-arrow-circle-o-down:before {
        content: "\\F01A";
      }

      .fa-arrow-circle-o-up:before {
        content: "\\F01B";
      }

      .fa-inbox:before {
        content: "\\F01C";
      }

      .fa-play-circle-o:before {
        content: "\\F01D";
      }

      .fa-repeat:before,
      .fa-rotate-right:before {
        content: "\\F01E";
      }

      .fa-refresh:before {
        content: "\\F021";
      }

      .fa-list-alt:before {
        content: "\\F022";
      }

      .fa-lock:before {
        content: "\\F023";
      }

      .fa-flag:before {
        content: "\\F024";
      }

      .fa-headphones:before {
        content: "\\F025";
      }

      .fa-volume-off:before {
        content: "\\F026";
      }

      .fa-volume-down:before {
        content: "\\F027";
      }

      .fa-volume-up:before {
        content: "\\F028";
      }

      .fa-qrcode:before {
        content: "\\F029";
      }

      .fa-barcode:before {
        content: "\\F02A";
      }

      .fa-tag:before {
        content: "\\F02B";
      }

      .fa-tags:before {
        content: "\\F02C";
      }

      .fa-book:before {
        content: "\\F02D";
      }

      .fa-bookmark:before {
        content: "\\F02E";
      }

      .fa-print:before {
        content: "\\F02F";
      }

      .fa-camera:before {
        content: "\\F030";
      }

      .fa-font:before {
        content: "\\F031";
      }

      .fa-bold:before {
        content: "\\F032";
      }

      .fa-italic:before {
        content: "\\F033";
      }

      .fa-text-height:before {
        content: "\\F034";
      }

      .fa-text-width:before {
        content: "\\F035";
      }

      .fa-align-left:before {
        content: "\\F036";
      }

      .fa-align-center:before {
        content: "\\F037";
      }

      .fa-align-right:before {
        content: "\\F038";
      }

      .fa-align-justify:before {
        content: "\\F039";
      }

      .fa-list:before {
        content: "\\F03A";
      }

      .fa-dedent:before,
      .fa-outdent:before {
        content: "\\F03B";
      }

      .fa-indent:before {
        content: "\\F03C";
      }

      .fa-video-camera:before {
        content: "\\F03D";
      }

      .fa-image:before,
      .fa-photo:before,
      .fa-picture-o:before {
        content: "\\F03E";
      }

      .fa-pencil:before {
        content: "\\F040";
      }

      .fa-map-marker:before {
        content: "\\F041";
      }

      .fa-adjust:before {
        content: "\\F042";
      }

      .fa-tint:before {
        content: "\\F043";
      }

      .fa-edit:before,
      .fa-pencil-square-o:before {
        content: "\\F044";
      }

      .fa-share-square-o:before {
        content: "\\F045";
      }

      .fa-check-square-o:before {
        content: "\\F046";
      }

      .fa-arrows:before {
        content: "\\F047";
      }

      .fa-step-backward:before {
        content: "\\F048";
      }

      .fa-fast-backward:before {
        content: "\\F049";
      }

      .fa-backward:before {
        content: "\\F04A";
      }

      .fa-play:before {
        content: "\\F04B";
      }

      .fa-pause:before {
        content: "\\F04C";
      }

      .fa-stop:before {
        content: "\\F04D";
      }

      .fa-forward:before {
        content: "\\F04E";
      }

      .fa-fast-forward:before {
        content: "\\F050";
      }

      .fa-step-forward:before {
        content: "\\F051";
      }

      .fa-eject:before {
        content: "\\F052";
      }

      .fa-chevron-left:before {
        content: "\\F053";
      }

      .fa-chevron-right:before {
        content: "\\F054";
      }

      .fa-plus-circle:before {
        content: "\\F055";
      }

      .fa-minus-circle:before {
        content: "\\F056";
      }

      .fa-times-circle:before {
        content: "\\F057";
      }

      .fa-check-circle:before {
        content: "\\F058";
      }

      .fa-question-circle:before {
        content: "\\F059";
      }

      .fa-info-circle:before {
        content: "\\F05A";
      }

      .fa-crosshairs:before {
        content: "\\F05B";
      }

      .fa-times-circle-o:before {
        content: "\\F05C";
      }

      .fa-check-circle-o:before {
        content: "\\F05D";
      }

      .fa-ban:before {
        content: "\\F05E";
      }

      .fa-arrow-left:before {
        content: "\\F060";
      }

      .fa-arrow-right:before {
        content: "\\F061";
      }

      .fa-arrow-up:before {
        content: "\\F062";
      }

      .fa-arrow-down:before {
        content: "\\F063";
      }

      .fa-mail-forward:before,
      .fa-share:before {
        content: "\\F064";
      }

      .fa-expand:before {
        content: "\\F065";
      }

      .fa-compress:before {
        content: "\\F066";
      }

      .fa-plus:before {
        content: "\\F067";
      }

      .fa-minus:before {
        content: "\\F068";
      }

      .fa-asterisk:before {
        content: "\\F069";
      }

      .fa-exclamation-circle:before {
        content: "\\F06A";
      }

      .fa-gift:before {
        content: "\\F06B";
      }

      .fa-leaf:before {
        content: "\\F06C";
      }

      .fa-fire:before {
        content: "\\F06D";
      }

      .fa-eye:before {
        content: "\\F06E";
      }

      .fa-eye-slash:before {
        content: "\\F070";
      }

      .fa-exclamation-triangle:before,
      .fa-warning:before {
        content: "\\F071";
      }

      .fa-plane:before {
        content: "\\F072";
      }

      .fa-calendar:before {
        content: "\\F073";
      }

      .fa-random:before {
        content: "\\F074";
      }

      .fa-comment:before {
        content: "\\F075";
      }

      .fa-magnet:before {
        content: "\\F076";
      }

      .fa-chevron-up:before {
        content: "\\F077";
      }

      .fa-chevron-down:before {
        content: "\\F078";
      }

      .fa-retweet:before {
        content: "\\F079";
      }

      .fa-shopping-cart:before {
        content: "\\F07A";
      }

      .fa-folder:before {
        content: "\\F07B";
      }

      .fa-folder-open:before {
        content: "\\F07C";
      }

      .fa-arrows-v:before {
        content: "\\F07D";
      }

      .fa-arrows-h:before {
        content: "\\F07E";
      }

      .fa-bar-chart-o:before,
      .fa-bar-chart:before {
        content: "\\F080";
      }

      .fa-twitter-square:before {
        content: "\\F081";
      }

      .fa-facebook-square:before {
        content: "\\F082";
      }

      .fa-camera-retro:before {
        content: "\\F083";
      }

      .fa-key:before {
        content: "\\F084";
      }

      .fa-cogs:before,
      .fa-gears:before {
        content: "\\F085";
      }

      .fa-comments:before {
        content: "\\F086";
      }

      .fa-thumbs-o-up:before {
        content: "\\F087";
      }

      .fa-thumbs-o-down:before {
        content: "\\F088";
      }

      .fa-star-half:before {
        content: "\\F089";
      }

      .fa-heart-o:before {
        content: "\\F08A";
      }

      .fa-sign-out:before {
        content: "\\F08B";
      }

      .fa-linkedin-square:before {
        content: "\\F08C";
      }

      .fa-thumb-tack:before {
        content: "\\F08D";
      }

      .fa-external-link:before {
        content: "\\F08E";
      }

      .fa-sign-in:before {
        content: "\\F090";
      }

      .fa-trophy:before {
        content: "\\F091";
      }

      .fa-github-square:before {
        content: "\\F092";
      }

      .fa-upload:before {
        content: "\\F093";
      }

      .fa-lemon-o:before {
        content: "\\F094";
      }

      .fa-phone:before {
        content: "\\F095";
      }

      .fa-square-o:before {
        content: "\\F096";
      }

      .fa-bookmark-o:before {
        content: "\\F097";
      }

      .fa-phone-square:before {
        content: "\\F098";
      }

      .fa-twitter:before {
        content: "\\F099";
      }

      .fa-facebook-f:before,
      .fa-facebook:before {
        content: "\\F09A";
      }

      .fa-github:before {
        content: "\\F09B";
      }

      .fa-unlock:before {
        content: "\\F09C";
      }

      .fa-credit-card:before {
        content: "\\F09D";
      }

      .fa-feed:before,
      .fa-rss:before {
        content: "\\F09E";
      }

      .fa-hdd-o:before {
        content: "\\F0A0";
      }

      .fa-bullhorn:before {
        content: "\\F0A1";
      }

      .fa-bell:before {
        content: "\\F0F3";
      }

      .fa-certificate:before {
        content: "\\F0A3";
      }

      .fa-hand-o-right:before {
        content: "\\F0A4";
      }

      .fa-hand-o-left:before {
        content: "\\F0A5";
      }

      .fa-hand-o-up:before {
        content: "\\F0A6";
      }

      .fa-hand-o-down:before {
        content: "\\F0A7";
      }

      .fa-arrow-circle-left:before {
        content: "\\F0A8";
      }

      .fa-arrow-circle-right:before {
        content: "\\F0A9";
      }

      .fa-arrow-circle-up:before {
        content: "\\F0AA";
      }

      .fa-arrow-circle-down:before {
        content: "\\F0AB";
      }

      .fa-globe:before {
        content: "\\F0AC";
      }

      .fa-wrench:before {
        content: "\\F0AD";
      }

      .fa-tasks:before {
        content: "\\F0AE";
      }

      .fa-filter:before {
        content: "\\F0B0";
      }

      .fa-briefcase:before {
        content: "\\F0B1";
      }

      .fa-arrows-alt:before {
        content: "\\F0B2";
      }

      .fa-group:before,
      .fa-users:before {
        content: "\\F0C0";
      }

      .fa-chain:before,
      .fa-link:before {
        content: "\\F0C1";
      }

      .fa-cloud:before {
        content: "\\F0C2";
      }

      .fa-flask:before {
        content: "\\F0C3";
      }

      .fa-cut:before,
      .fa-scissors:before {
        content: "\\F0C4";
      }

      .fa-copy:before,
      .fa-files-o:before {
        content: "\\F0C5";
      }

      .fa-paperclip:before {
        content: "\\F0C6";
      }

      .fa-floppy-o:before,
      .fa-save:before {
        content: "\\F0C7";
      }

      .fa-square:before {
        content: "\\F0C8";
      }

      .fa-bars:before,
      .fa-navicon:before,
      .fa-reorder:before {
        content: "\\F0C9";
      }

      .fa-list-ul:before {
        content: "\\F0CA";
      }

      .fa-list-ol:before {
        content: "\\F0CB";
      }

      .fa-strikethrough:before {
        content: "\\F0CC";
      }

      .fa-underline:before {
        content: "\\F0CD";
      }

      .fa-table:before {
        content: "\\F0CE";
      }

      .fa-magic:before {
        content: "\\F0D0";
      }

      .fa-truck:before {
        content: "\\F0D1";
      }

      .fa-pinterest:before {
        content: "\\F0D2";
      }

      .fa-pinterest-square:before {
        content: "\\F0D3";
      }

      .fa-google-plus-square:before {
        content: "\\F0D4";
      }

      .fa-google-plus:before {
        content: "\\F0D5";
      }

      .fa-money:before {
        content: "\\F0D6";
      }

      .fa-caret-down:before {
        content: "\\F0D7";
      }

      .fa-caret-up:before {
        content: "\\F0D8";
      }

      .fa-caret-left:before {
        content: "\\F0D9";
      }

      .fa-caret-right:before {
        content: "\\F0DA";
      }

      .fa-columns:before {
        content: "\\F0DB";
      }

      .fa-sort:before,
      .fa-unsorted:before {
        content: "\\F0DC";
      }

      .fa-sort-desc:before,
      .fa-sort-down:before {
        content: "\\F0DD";
      }

      .fa-sort-asc:before,
      .fa-sort-up:before {
        content: "\\F0DE";
      }

      .fa-envelope:before {
        content: "\\F0E0";
      }

      .fa-linkedin:before {
        content: "\\F0E1";
      }

      .fa-rotate-left:before,
      .fa-undo:before {
        content: "\\F0E2";
      }

      .fa-gavel:before,
      .fa-legal:before {
        content: "\\F0E3";
      }

      .fa-dashboard:before,
      .fa-tachometer:before {
        content: "\\F0E4";
      }

      .fa-comment-o:before {
        content: "\\F0E5";
      }

      .fa-comments-o:before {
        content: "\\F0E6";
      }

      .fa-bolt:before,
      .fa-flash:before {
        content: "\\F0E7";
      }

      .fa-sitemap:before {
        content: "\\F0E8";
      }

      .fa-umbrella:before {
        content: "\\F0E9";
      }

      .fa-clipboard:before,
      .fa-paste:before {
        content: "\\F0EA";
      }

      .fa-lightbulb-o:before {
        content: "\\F0EB";
      }

      .fa-exchange:before {
        content: "\\F0EC";
      }

      .fa-cloud-download:before {
        content: "\\F0ED";
      }

      .fa-cloud-upload:before {
        content: "\\F0EE";
      }

      .fa-user-md:before {
        content: "\\F0F0";
      }

      .fa-stethoscope:before {
        content: "\\F0F1";
      }

      .fa-suitcase:before {
        content: "\\F0F2";
      }

      .fa-bell-o:before {
        content: "\\F0A2";
      }

      .fa-coffee:before {
        content: "\\F0F4";
      }

      .fa-cutlery:before {
        content: "\\F0F5";
      }

      .fa-file-text-o:before {
        content: "\\F0F6";
      }

      .fa-building-o:before {
        content: "\\F0F7";
      }

      .fa-hospital-o:before {
        content: "\\F0F8";
      }

      .fa-ambulance:before {
        content: "\\F0F9";
      }

      .fa-medkit:before {
        content: "\\F0FA";
      }

      .fa-fighter-jet:before {
        content: "\\F0FB";
      }

      .fa-beer:before {
        content: "\\F0FC";
      }

      .fa-h-square:before {
        content: "\\F0FD";
      }

      .fa-plus-square:before {
        content: "\\F0FE";
      }

      .fa-angle-double-left:before {
        content: "\\F100";
      }

      .fa-angle-double-right:before {
        content: "\\F101";
      }

      .fa-angle-double-up:before {
        content: "\\F102";
      }

      .fa-angle-double-down:before {
        content: "\\F103";
      }

      .fa-angle-left:before {
        content: "\\F104";
      }

      .fa-angle-right:before {
        content: "\\F105";
      }

      .fa-angle-up:before {
        content: "\\F106";
      }

      .fa-angle-down:before {
        content: "\\F107";
      }

      .fa-desktop:before {
        content: "\\F108";
      }

      .fa-laptop:before {
        content: "\\F109";
      }

      .fa-tablet:before {
        content: "\\F10A";
      }

      .fa-mobile-phone:before,
      .fa-mobile:before {
        content: "\\F10B";
      }

      .fa-circle-o:before {
        content: "\\F10C";
      }

      .fa-quote-left:before {
        content: "\\F10D";
      }

      .fa-quote-right:before {
        content: "\\F10E";
      }

      .fa-spinner:before {
        content: "\\F110";
      }

      .fa-circle:before {
        content: "\\F111";
      }

      .fa-mail-reply:before,
      .fa-reply:before {
        content: "\\F112";
      }

      .fa-github-alt:before {
        content: "\\F113";
      }

      .fa-folder-o:before {
        content: "\\F114";
      }

      .fa-folder-open-o:before {
        content: "\\F115";
      }

      .fa-smile-o:before {
        content: "\\F118";
      }

      .fa-frown-o:before {
        content: "\\F119";
      }

      .fa-meh-o:before {
        content: "\\F11A";
      }

      .fa-gamepad:before {
        content: "\\F11B";
      }

      .fa-keyboard-o:before {
        content: "\\F11C";
      }

      .fa-flag-o:before {
        content: "\\F11D";
      }

      .fa-flag-checkered:before {
        content: "\\F11E";
      }

      .fa-terminal:before {
        content: "\\F120";
      }

      .fa-code:before {
        content: "\\F121";
      }

      .fa-mail-reply-all:before,
      .fa-reply-all:before {
        content: "\\F122";
      }

      .fa-star-half-empty:before,
      .fa-star-half-full:before,
      .fa-star-half-o:before {
        content: "\\F123";
      }

      .fa-location-arrow:before {
        content: "\\F124";
      }

      .fa-crop:before {
        content: "\\F125";
      }

      .fa-code-fork:before {
        content: "\\F126";
      }

      .fa-chain-broken:before,
      .fa-unlink:before {
        content: "\\F127";
      }

      .fa-question:before {
        content: "\\F128";
      }

      .fa-info:before {
        content: "\\F129";
      }

      .fa-exclamation:before {
        content: "\\F12A";
      }

      .fa-superscript:before {
        content: "\\F12B";
      }

      .fa-subscript:before {
        content: "\\F12C";
      }

      .fa-eraser:before {
        content: "\\F12D";
      }

      .fa-puzzle-piece:before {
        content: "\\F12E";
      }

      .fa-microphone:before {
        content: "\\F130";
      }

      .fa-microphone-slash:before {
        content: "\\F131";
      }

      .fa-shield:before {
        content: "\\F132";
      }

      .fa-calendar-o:before {
        content: "\\F133";
      }

      .fa-fire-extinguisher:before {
        content: "\\F134";
      }

      .fa-rocket:before {
        content: "\\F135";
      }

      .fa-maxcdn:before {
        content: "\\F136";
      }

      .fa-chevron-circle-left:before {
        content: "\\F137";
      }

      .fa-chevron-circle-right:before {
        content: "\\F138";
      }

      .fa-chevron-circle-up:before {
        content: "\\F139";
      }

      .fa-chevron-circle-down:before {
        content: "\\F13A";
      }

      .fa-html5:before {
        content: "\\F13B";
      }

      .fa-css3:before {
        content: "\\F13C";
      }

      .fa-anchor:before {
        content: "\\F13D";
      }

      .fa-unlock-alt:before {
        content: "\\F13E";
      }

      .fa-bullseye:before {
        content: "\\F140";
      }

      .fa-ellipsis-h:before {
        content: "\\F141";
      }

      .fa-ellipsis-v:before {
        content: "\\F142";
      }

      .fa-rss-square:before {
        content: "\\F143";
      }

      .fa-play-circle:before {
        content: "\\F144";
      }

      .fa-ticket:before {
        content: "\\F145";
      }

      .fa-minus-square:before {
        content: "\\F146";
      }

      .fa-minus-square-o:before {
        content: "\\F147";
      }

      .fa-level-up:before {
        content: "\\F148";
      }

      .fa-level-down:before {
        content: "\\F149";
      }

      .fa-check-square:before {
        content: "\\F14A";
      }

      .fa-pencil-square:before {
        content: "\\F14B";
      }

      .fa-external-link-square:before {
        content: "\\F14C";
      }

      .fa-share-square:before {
        content: "\\F14D";
      }

      .fa-compass:before {
        content: "\\F14E";
      }

      .fa-caret-square-o-down:before,
      .fa-toggle-down:before {
        content: "\\F150";
      }

      .fa-caret-square-o-up:before,
      .fa-toggle-up:before {
        content: "\\F151";
      }

      .fa-caret-square-o-right:before,
      .fa-toggle-right:before {
        content: "\\F152";
      }

      .fa-eur:before,
      .fa-euro:before {
        content: "\\F153";
      }

      .fa-gbp:before {
        content: "\\F154";
      }

      .fa-dollar:before,
      .fa-usd:before {
        content: "\\F155";
      }

      .fa-inr:before,
      .fa-rupee:before {
        content: "\\F156";
      }

      .fa-cny:before,
      .fa-jpy:before,
      .fa-rmb:before,
      .fa-yen:before {
        content: "\\F157";
      }

      .fa-rouble:before,
      .fa-rub:before,
      .fa-ruble:before {
        content: "\\F158";
      }

      .fa-krw:before,
      .fa-won:before {
        content: "\\F159";
      }

      .fa-bitcoin:before,
      .fa-btc:before {
        content: "\\F15A";
      }

      .fa-file:before {
        content: "\\F15B";
      }

      .fa-file-text:before {
        content: "\\F15C";
      }

      .fa-sort-alpha-asc:before {
        content: "\\F15D";
      }

      .fa-sort-alpha-desc:before {
        content: "\\F15E";
      }

      .fa-sort-amount-asc:before {
        content: "\\F160";
      }

      .fa-sort-amount-desc:before {
        content: "\\F161";
      }

      .fa-sort-numeric-asc:before {
        content: "\\F162";
      }

      .fa-sort-numeric-desc:before {
        content: "\\F163";
      }

      .fa-thumbs-up:before {
        content: "\\F164";
      }

      .fa-thumbs-down:before {
        content: "\\F165";
      }

      .fa-youtube-square:before {
        content: "\\F166";
      }

      .fa-youtube:before {
        content: "\\F167";
      }

      .fa-xing:before {
        content: "\\F168";
      }

      .fa-xing-square:before {
        content: "\\F169";
      }

      .fa-youtube-play:before {
        content: "\\F16A";
      }

      .fa-dropbox:before {
        content: "\\F16B";
      }

      .fa-stack-overflow:before {
        content: "\\F16C";
      }

      .fa-instagram:before {
        content: "\\F16D";
      }

      .fa-flickr:before {
        content: "\\F16E";
      }

      .fa-adn:before {
        content: "\\F170";
      }

      .fa-bitbucket:before {
        content: "\\F171";
      }

      .fa-bitbucket-square:before {
        content: "\\F172";
      }

      .fa-tumblr:before {
        content: "\\F173";
      }

      .fa-tumblr-square:before {
        content: "\\F174";
      }

      .fa-long-arrow-down:before {
        content: "\\F175";
      }

      .fa-long-arrow-up:before {
        content: "\\F176";
      }

      .fa-long-arrow-left:before {
        content: "\\F177";
      }

      .fa-long-arrow-right:before {
        content: "\\F178";
      }

      .fa-apple:before {
        content: "\\F179";
      }

      .fa-windows:before {
        content: "\\F17A";
      }

      .fa-android:before {
        content: "\\F17B";
      }

      .fa-linux:before {
        content: "\\F17C";
      }

      .fa-dribbble:before {
        content: "\\F17D";
      }

      .fa-skype:before {
        content: "\\F17E";
      }

      .fa-foursquare:before {
        content: "\\F180";
      }

      .fa-trello:before {
        content: "\\F181";
      }

      .fa-female:before {
        content: "\\F182";
      }

      .fa-male:before {
        content: "\\F183";
      }

      .fa-gittip:before,
      .fa-gratipay:before {
        content: "\\F184";
      }

      .fa-sun-o:before {
        content: "\\F185";
      }

      .fa-moon-o:before {
        content: "\\F186";
      }

      .fa-archive:before {
        content: "\\F187";
      }

      .fa-bug:before {
        content: "\\F188";
      }

      .fa-vk:before {
        content: "\\F189";
      }

      .fa-weibo:before {
        content: "\\F18A";
      }

      .fa-renren:before {
        content: "\\F18B";
      }

      .fa-pagelines:before {
        content: "\\F18C";
      }

      .fa-stack-exchange:before {
        content: "\\F18D";
      }

      .fa-arrow-circle-o-right:before {
        content: "\\F18E";
      }

      .fa-arrow-circle-o-left:before {
        content: "\\F190";
      }

      .fa-caret-square-o-left:before,
      .fa-toggle-left:before {
        content: "\\F191";
      }

      .fa-dot-circle-o:before {
        content: "\\F192";
      }

      .fa-wheelchair:before {
        content: "\\F193";
      }

      .fa-vimeo-square:before {
        content: "\\F194";
      }

      .fa-try:before,
      .fa-turkish-lira:before {
        content: "\\F195";
      }

      .fa-plus-square-o:before {
        content: "\\F196";
      }

      .fa-space-shuttle:before {
        content: "\\F197";
      }

      .fa-slack:before {
        content: "\\F198";
      }

      .fa-envelope-square:before {
        content: "\\F199";
      }

      .fa-wordpress:before {
        content: "\\F19A";
      }

      .fa-openid:before {
        content: "\\F19B";
      }

      .fa-bank:before,
      .fa-institution:before,
      .fa-university:before {
        content: "\\F19C";
      }

      .fa-graduation-cap:before,
      .fa-mortar-board:before {
        content: "\\F19D";
      }

      .fa-yahoo:before {
        content: "\\F19E";
      }

      .fa-google:before {
        content: "\\F1A0";
      }

      .fa-reddit:before {
        content: "\\F1A1";
      }

      .fa-reddit-square:before {
        content: "\\F1A2";
      }

      .fa-stumbleupon-circle:before {
        content: "\\F1A3";
      }

      .fa-stumbleupon:before {
        content: "\\F1A4";
      }

      .fa-delicious:before {
        content: "\\F1A5";
      }

      .fa-digg:before {
        content: "\\F1A6";
      }

      .fa-pied-piper-pp:before {
        content: "\\F1A7";
      }

      .fa-pied-piper-alt:before {
        content: "\\F1A8";
      }

      .fa-drupal:before {
        content: "\\F1A9";
      }

      .fa-joomla:before {
        content: "\\F1AA";
      }

      .fa-language:before {
        content: "\\F1AB";
      }

      .fa-fax:before {
        content: "\\F1AC";
      }

      .fa-building:before {
        content: "\\F1AD";
      }

      .fa-child:before {
        content: "\\F1AE";
      }

      .fa-paw:before {
        content: "\\F1B0";
      }

      .fa-spoon:before {
        content: "\\F1B1";
      }

      .fa-cube:before {
        content: "\\F1B2";
      }

      .fa-cubes:before {
        content: "\\F1B3";
      }

      .fa-behance:before {
        content: "\\F1B4";
      }

      .fa-behance-square:before {
        content: "\\F1B5";
      }

      .fa-steam:before {
        content: "\\F1B6";
      }

      .fa-steam-square:before {
        content: "\\F1B7";
      }

      .fa-recycle:before {
        content: "\\F1B8";
      }

      .fa-automobile:before,
      .fa-car:before {
        content: "\\F1B9";
      }

      .fa-cab:before,
      .fa-taxi:before {
        content: "\\F1BA";
      }

      .fa-tree:before {
        content: "\\F1BB";
      }

      .fa-spotify:before {
        content: "\\F1BC";
      }

      .fa-deviantart:before {
        content: "\\F1BD";
      }

      .fa-soundcloud:before {
        content: "\\F1BE";
      }

      .fa-database:before {
        content: "\\F1C0";
      }

      .fa-file-pdf-o:before {
        content: "\\F1C1";
      }

      .fa-file-word-o:before {
        content: "\\F1C2";
      }

      .fa-file-excel-o:before {
        content: "\\F1C3";
      }

      .fa-file-powerpoint-o:before {
        content: "\\F1C4";
      }

      .fa-file-image-o:before,
      .fa-file-photo-o:before,
      .fa-file-picture-o:before {
        content: "\\F1C5";
      }

      .fa-file-archive-o:before,
      .fa-file-zip-o:before {
        content: "\\F1C6";
      }

      .fa-file-audio-o:before,
      .fa-file-sound-o:before {
        content: "\\F1C7";
      }

      .fa-file-movie-o:before,
      .fa-file-video-o:before {
        content: "\\F1C8";
      }

      .fa-file-code-o:before {
        content: "\\F1C9";
      }

      .fa-vine:before {
        content: "\\F1CA";
      }

      .fa-codepen:before {
        content: "\\F1CB";
      }

      .fa-jsfiddle:before {
        content: "\\F1CC";
      }

      .fa-life-bouy:before,
      .fa-life-buoy:before,
      .fa-life-ring:before,
      .fa-life-saver:before,
      .fa-support:before {
        content: "\\F1CD";
      }

      .fa-circle-o-notch:before {
        content: "\\F1CE";
      }

      .fa-ra:before,
      .fa-rebel:before,
      .fa-resistance:before {
        content: "\\F1D0";
      }

      .fa-empire:before,
      .fa-ge:before {
        content: "\\F1D1";
      }

      .fa-git-square:before {
        content: "\\F1D2";
      }

      .fa-git:before {
        content: "\\F1D3";
      }

      .fa-hacker-news:before,
      .fa-y-combinator-square:before,
      .fa-yc-square:before {
        content: "\\F1D4";
      }

      .fa-tencent-weibo:before {
        content: "\\F1D5";
      }

      .fa-qq:before {
        content: "\\F1D6";
      }

      .fa-wechat:before,
      .fa-weixin:before {
        content: "\\F1D7";
      }

      .fa-paper-plane:before,
      .fa-send:before {
        content: "\\F1D8";
      }

      .fa-paper-plane-o:before,
      .fa-send-o:before {
        content: "\\F1D9";
      }

      .fa-history:before {
        content: "\\F1DA";
      }

      .fa-circle-thin:before {
        content: "\\F1DB";
      }

      .fa-header:before {
        content: "\\F1DC";
      }

      .fa-paragraph:before {
        content: "\\F1DD";
      }

      .fa-sliders:before {
        content: "\\F1DE";
      }

      .fa-share-alt:before {
        content: "\\F1E0";
      }

      .fa-share-alt-square:before {
        content: "\\F1E1";
      }

      .fa-bomb:before {
        content: "\\F1E2";
      }

      .fa-futbol-o:before,
      .fa-soccer-ball-o:before {
        content: "\\F1E3";
      }

      .fa-tty:before {
        content: "\\F1E4";
      }

      .fa-binoculars:before {
        content: "\\F1E5";
      }

      .fa-plug:before {
        content: "\\F1E6";
      }

      .fa-slideshare:before {
        content: "\\F1E7";
      }

      .fa-twitch:before {
        content: "\\F1E8";
      }

      .fa-yelp:before {
        content: "\\F1E9";
      }

      .fa-newspaper-o:before {
        content: "\\F1EA";
      }

      .fa-wifi:before {
        content: "\\F1EB";
      }

      .fa-calculator:before {
        content: "\\F1EC";
      }

      .fa-paypal:before {
        content: "\\F1ED";
      }

      .fa-google-wallet:before {
        content: "\\F1EE";
      }

      .fa-cc-visa:before {
        content: "\\F1F0";
      }

      .fa-cc-mastercard:before {
        content: "\\F1F1";
      }

      .fa-cc-discover:before {
        content: "\\F1F2";
      }

      .fa-cc-amex:before {
        content: "\\F1F3";
      }

      .fa-cc-paypal:before {
        content: "\\F1F4";
      }

      .fa-cc-stripe:before {
        content: "\\F1F5";
      }

      .fa-bell-slash:before {
        content: "\\F1F6";
      }

      .fa-bell-slash-o:before {
        content: "\\F1F7";
      }

      .fa-trash:before {
        content: "\\F1F8";
      }

      .fa-copyright:before {
        content: "\\F1F9";
      }

      .fa-at:before {
        content: "\\F1FA";
      }

      .fa-eyedropper:before {
        content: "\\F1FB";
      }

      .fa-paint-brush:before {
        content: "\\F1FC";
      }

      .fa-birthday-cake:before {
        content: "\\F1FD";
      }

      .fa-area-chart:before {
        content: "\\F1FE";
      }

      .fa-pie-chart:before {
        content: "\\F200";
      }

      .fa-line-chart:before {
        content: "\\F201";
      }

      .fa-lastfm:before {
        content: "\\F202";
      }

      .fa-lastfm-square:before {
        content: "\\F203";
      }

      .fa-toggle-off:before {
        content: "\\F204";
      }

      .fa-toggle-on:before {
        content: "\\F205";
      }

      .fa-bicycle:before {
        content: "\\F206";
      }

      .fa-bus:before {
        content: "\\F207";
      }

      .fa-ioxhost:before {
        content: "\\F208";
      }

      .fa-angellist:before {
        content: "\\F209";
      }

      .fa-cc:before {
        content: "\\F20A";
      }

      .fa-ils:before,
      .fa-shekel:before,
      .fa-sheqel:before {
        content: "\\F20B";
      }

      .fa-meanpath:before {
        content: "\\F20C";
      }

      .fa-buysellads:before {
        content: "\\F20D";
      }

      .fa-connectdevelop:before {
        content: "\\F20E";
      }

      .fa-dashcube:before {
        content: "\\F210";
      }

      .fa-forumbee:before {
        content: "\\F211";
      }

      .fa-leanpub:before {
        content: "\\F212";
      }

      .fa-sellsy:before {
        content: "\\F213";
      }

      .fa-shirtsinbulk:before {
        content: "\\F214";
      }

      .fa-simplybuilt:before {
        content: "\\F215";
      }

      .fa-skyatlas:before {
        content: "\\F216";
      }

      .fa-cart-plus:before {
        content: "\\F217";
      }

      .fa-cart-arrow-down:before {
        content: "\\F218";
      }

      .fa-diamond:before {
        content: "\\F219";
      }

      .fa-ship:before {
        content: "\\F21A";
      }

      .fa-user-secret:before {
        content: "\\F21B";
      }

      .fa-motorcycle:before {
        content: "\\F21C";
      }

      .fa-street-view:before {
        content: "\\F21D";
      }

      .fa-heartbeat:before {
        content: "\\F21E";
      }

      .fa-venus:before {
        content: "\\F221";
      }

      .fa-mars:before {
        content: "\\F222";
      }

      .fa-mercury:before {
        content: "\\F223";
      }

      .fa-intersex:before,
      .fa-transgender:before {
        content: "\\F224";
      }

      .fa-transgender-alt:before {
        content: "\\F225";
      }

      .fa-venus-double:before {
        content: "\\F226";
      }

      .fa-mars-double:before {
        content: "\\F227";
      }

      .fa-venus-mars:before {
        content: "\\F228";
      }

      .fa-mars-stroke:before {
        content: "\\F229";
      }

      .fa-mars-stroke-v:before {
        content: "\\F22A";
      }

      .fa-mars-stroke-h:before {
        content: "\\F22B";
      }

      .fa-neuter:before {
        content: "\\F22C";
      }

      .fa-genderless:before {
        content: "\\F22D";
      }

      .fa-facebook-official:before {
        content: "\\F230";
      }

      .fa-pinterest-p:before {
        content: "\\F231";
      }

      .fa-whatsapp:before {
        content: "\\F232";
      }

      .fa-server:before {
        content: "\\F233";
      }

      .fa-user-plus:before {
        content: "\\F234";
      }

      .fa-user-times:before {
        content: "\\F235";
      }

      .fa-bed:before,
      .fa-hotel:before {
        content: "\\F236";
      }

      .fa-viacoin:before {
        content: "\\F237";
      }

      .fa-train:before {
        content: "\\F238";
      }

      .fa-subway:before {
        content: "\\F239";
      }

      .fa-medium:before {
        content: "\\F23A";
      }

      .fa-y-combinator:before,
      .fa-yc:before {
        content: "\\F23B";
      }

      .fa-optin-monster:before {
        content: "\\F23C";
      }

      .fa-opencart:before {
        content: "\\F23D";
      }

      .fa-expeditedssl:before {
        content: "\\F23E";
      }

      .fa-battery-4:before,
      .fa-battery-full:before,
      .fa-battery:before {
        content: "\\F240";
      }

      .fa-battery-3:before,
      .fa-battery-three-quarters:before {
        content: "\\F241";
      }

      .fa-battery-2:before,
      .fa-battery-half:before {
        content: "\\F242";
      }

      .fa-battery-1:before,
      .fa-battery-quarter:before {
        content: "\\F243";
      }

      .fa-battery-0:before,
      .fa-battery-empty:before {
        content: "\\F244";
      }

      .fa-mouse-pointer:before {
        content: "\\F245";
      }

      .fa-i-cursor:before {
        content: "\\F246";
      }

      .fa-object-group:before {
        content: "\\F247";
      }

      .fa-object-ungroup:before {
        content: "\\F248";
      }

      .fa-sticky-note:before {
        content: "\\F249";
      }

      .fa-sticky-note-o:before {
        content: "\\F24A";
      }

      .fa-cc-jcb:before {
        content: "\\F24B";
      }

      .fa-cc-diners-club:before {
        content: "\\F24C";
      }

      .fa-clone:before {
        content: "\\F24D";
      }

      .fa-balance-scale:before {
        content: "\\F24E";
      }

      .fa-hourglass-o:before {
        content: "\\F250";
      }

      .fa-hourglass-1:before,
      .fa-hourglass-start:before {
        content: "\\F251";
      }

      .fa-hourglass-2:before,
      .fa-hourglass-half:before {
        content: "\\F252";
      }

      .fa-hourglass-3:before,
      .fa-hourglass-end:before {
        content: "\\F253";
      }

      .fa-hourglass:before {
        content: "\\F254";
      }

      .fa-hand-grab-o:before,
      .fa-hand-rock-o:before {
        content: "\\F255";
      }

      .fa-hand-paper-o:before,
      .fa-hand-stop-o:before {
        content: "\\F256";
      }

      .fa-hand-scissors-o:before {
        content: "\\F257";
      }

      .fa-hand-lizard-o:before {
        content: "\\F258";
      }

      .fa-hand-spock-o:before {
        content: "\\F259";
      }

      .fa-hand-pointer-o:before {
        content: "\\F25A";
      }

      .fa-hand-peace-o:before {
        content: "\\F25B";
      }

      .fa-trademark:before {
        content: "\\F25C";
      }

      .fa-registered:before {
        content: "\\F25D";
      }

      .fa-creative-commons:before {
        content: "\\F25E";
      }

      .fa-gg:before {
        content: "\\F260";
      }

      .fa-gg-circle:before {
        content: "\\F261";
      }

      .fa-tripadvisor:before {
        content: "\\F262";
      }

      .fa-odnoklassniki:before {
        content: "\\F263";
      }

      .fa-odnoklassniki-square:before {
        content: "\\F264";
      }

      .fa-get-pocket:before {
        content: "\\F265";
      }

      .fa-wikipedia-w:before {
        content: "\\F266";
      }

      .fa-safari:before {
        content: "\\F267";
      }

      .fa-chrome:before {
        content: "\\F268";
      }

      .fa-firefox:before {
        content: "\\F269";
      }

      .fa-opera:before {
        content: "\\F26A";
      }

      .fa-internet-explorer:before {
        content: "\\F26B";
      }

      .fa-television:before,
      .fa-tv:before {
        content: "\\F26C";
      }

      .fa-contao:before {
        content: "\\F26D";
      }

      .fa-500px:before {
        content: "\\F26E";
      }

      .fa-amazon:before {
        content: "\\F270";
      }

      .fa-calendar-plus-o:before {
        content: "\\F271";
      }

      .fa-calendar-minus-o:before {
        content: "\\F272";
      }

      .fa-calendar-times-o:before {
        content: "\\F273";
      }

      .fa-calendar-check-o:before {
        content: "\\F274";
      }

      .fa-industry:before {
        content: "\\F275";
      }

      .fa-map-pin:before {
        content: "\\F276";
      }

      .fa-map-signs:before {
        content: "\\F277";
      }

      .fa-map-o:before {
        content: "\\F278";
      }

      .fa-map:before {
        content: "\\F279";
      }

      .fa-commenting:before {
        content: "\\F27A";
      }

      .fa-commenting-o:before {
        content: "\\F27B";
      }

      .fa-houzz:before {
        content: "\\F27C";
      }

      .fa-vimeo:before {
        content: "\\F27D";
      }

      .fa-black-tie:before {
        content: "\\F27E";
      }

      .fa-fonticons:before {
        content: "\\F280";
      }

      .fa-reddit-alien:before {
        content: "\\F281";
      }

      .fa-edge:before {
        content: "\\F282";
      }

      .fa-credit-card-alt:before {
        content: "\\F283";
      }

      .fa-codiepie:before {
        content: "\\F284";
      }

      .fa-modx:before {
        content: "\\F285";
      }

      .fa-fort-awesome:before {
        content: "\\F286";
      }

      .fa-usb:before {
        content: "\\F287";
      }

      .fa-product-hunt:before {
        content: "\\F288";
      }

      .fa-mixcloud:before {
        content: "\\F289";
      }

      .fa-scribd:before {
        content: "\\F28A";
      }

      .fa-pause-circle:before {
        content: "\\F28B";
      }

      .fa-pause-circle-o:before {
        content: "\\F28C";
      }

      .fa-stop-circle:before {
        content: "\\F28D";
      }

      .fa-stop-circle-o:before {
        content: "\\F28E";
      }

      .fa-shopping-bag:before {
        content: "\\F290";
      }

      .fa-shopping-basket:before {
        content: "\\F291";
      }

      .fa-hashtag:before {
        content: "\\F292";
      }

      .fa-bluetooth:before {
        content: "\\F293";
      }

      .fa-bluetooth-b:before {
        content: "\\F294";
      }

      .fa-percent:before {
        content: "\\F295";
      }

      .fa-gitlab:before {
        content: "\\F296";
      }

      .fa-wpbeginner:before {
        content: "\\F297";
      }

      .fa-wpforms:before {
        content: "\\F298";
      }

      .fa-envira:before {
        content: "\\F299";
      }

      .fa-universal-access:before {
        content: "\\F29A";
      }

      .fa-wheelchair-alt:before {
        content: "\\F29B";
      }

      .fa-question-circle-o:before {
        content: "\\F29C";
      }

      .fa-blind:before {
        content: "\\F29D";
      }

      .fa-audio-description:before {
        content: "\\F29E";
      }

      .fa-volume-control-phone:before {
        content: "\\F2A0";
      }

      .fa-braille:before {
        content: "\\F2A1";
      }

      .fa-assistive-listening-systems:before {
        content: "\\F2A2";
      }

      .fa-american-sign-language-interpreting:before,
      .fa-asl-interpreting:before {
        content: "\\F2A3";
      }

      .fa-deaf:before,
      .fa-deafness:before,
      .fa-hard-of-hearing:before {
        content: "\\F2A4";
      }

      .fa-glide:before {
        content: "\\F2A5";
      }

      .fa-glide-g:before {
        content: "\\F2A6";
      }

      .fa-sign-language:before,
      .fa-signing:before {
        content: "\\F2A7";
      }

      .fa-low-vision:before {
        content: "\\F2A8";
      }

      .fa-viadeo:before {
        content: "\\F2A9";
      }

      .fa-viadeo-square:before {
        content: "\\F2AA";
      }

      .fa-snapchat:before {
        content: "\\F2AB";
      }

      .fa-snapchat-ghost:before {
        content: "\\F2AC";
      }

      .fa-snapchat-square:before {
        content: "\\F2AD";
      }

      .fa-pied-piper:before {
        content: "\\F2AE";
      }

      .fa-first-order:before {
        content: "\\F2B0";
      }

      .fa-yoast:before {
        content: "\\F2B1";
      }

      .fa-themeisle:before {
        content: "\\F2B2";
      }

      .fa-google-plus-circle:before,
      .fa-google-plus-official:before {
        content: "\\F2B3";
      }

      .fa-fa:before,
      .fa-font-awesome:before {
        content: "\\F2B4";
      }

      .fa-handshake-o:before {
        content: "\\F2B5";
      }

      .fa-envelope-open:before {
        content: "\\F2B6";
      }

      .fa-envelope-open-o:before {
        content: "\\F2B7";
      }

      .fa-linode:before {
        content: "\\F2B8";
      }

      .fa-address-book:before {
        content: "\\F2B9";
      }

      .fa-address-book-o:before {
        content: "\\F2BA";
      }

      .fa-address-card:before,
      .fa-vcard:before {
        content: "\\F2BB";
      }

      .fa-address-card-o:before,
      .fa-vcard-o:before {
        content: "\\F2BC";
      }

      .fa-user-circle:before {
        content: "\\F2BD";
      }

      .fa-user-circle-o:before {
        content: "\\F2BE";
      }

      .fa-user-o:before {
        content: "\\F2C0";
      }

      .fa-id-badge:before {
        content: "\\F2C1";
      }

      .fa-drivers-license:before,
      .fa-id-card:before {
        content: "\\F2C2";
      }

      .fa-drivers-license-o:before,
      .fa-id-card-o:before {
        content: "\\F2C3";
      }

      .fa-quora:before {
        content: "\\F2C4";
      }

      .fa-free-code-camp:before {
        content: "\\F2C5";
      }

      .fa-telegram:before {
        content: "\\F2C6";
      }

      .fa-thermometer-4:before,
      .fa-thermometer-full:before,
      .fa-thermometer:before {
        content: "\\F2C7";
      }

      .fa-thermometer-3:before,
      .fa-thermometer-three-quarters:before {
        content: "\\F2C8";
      }

      .fa-thermometer-2:before,
      .fa-thermometer-half:before {
        content: "\\F2C9";
      }

      .fa-thermometer-1:before,
      .fa-thermometer-quarter:before {
        content: "\\F2CA";
      }

      .fa-thermometer-0:before,
      .fa-thermometer-empty:before {
        content: "\\F2CB";
      }

      .fa-shower:before {
        content: "\\F2CC";
      }

      .fa-bath:before,
      .fa-bathtub:before,
      .fa-s15:before {
        content: "\\F2CD";
      }

      .fa-podcast:before {
        content: "\\F2CE";
      }

      .fa-window-maximize:before {
        content: "\\F2D0";
      }

      .fa-window-minimize:before {
        content: "\\F2D1";
      }

      .fa-window-restore:before {
        content: "\\F2D2";
      }

      .fa-times-rectangle:before,
      .fa-window-close:before {
        content: "\\F2D3";
      }

      .fa-times-rectangle-o:before,
      .fa-window-close-o:before {
        content: "\\F2D4";
      }

      .fa-bandcamp:before {
        content: "\\F2D5";
      }

      .fa-grav:before {
        content: "\\F2D6";
      }

      .fa-etsy:before {
        content: "\\F2D7";
      }

      .fa-imdb:before {
        content: "\\F2D8";
      }

      .fa-ravelry:before {
        content: "\\F2D9";
      }

      .fa-eercast:before {
        content: "\\F2DA";
      }

      .fa-microchip:before {
        content: "\\F2DB";
      }

      .fa-snowflake-o:before {
        content: "\\F2DC";
      }

      .fa-superpowers:before {
        content: "\\F2DD";
      }

      .fa-wpexplorer:before {
        content: "\\F2DE";
      }

      .fa-meetup:before {
        content: "\\F2E0";
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      .sr-only-focusable:active,
      .sr-only-focusable:focus {
        position: static;
        width: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        clip: auto;
      }

      #gnb .popover {
        border: 0;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.16);
        top: 11px !important;
      }

      #gnb .popover-header {
        padding: 14px 18px;
        background-color: #fff;
      }

      #gnb .popover-body {
        padding: 10px 18px;
      }

      #gnb .arrow:before {
        border-bottom-color: rgba(0, 0, 0, 0.1);
      }

      #spotDetail .tooltip-inner {
        max-width: 100%;
        padding: 0;
        text-align: left;
        background-color: #fff;
        border-radius: 1px;
        border: 1px solid #ebebeb;
        box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.15);
        overflow-x: auto;
      }

      #spotDetail .tooltip-inner::-webkit-scrollbar {
        height: 3px;
      }

      #spotDetail .tooltip-inner::-webkit-scrollbar-thumb {
        background: #00afa0;
      }

      #spotDetail .tooltip {
        max-width: 100% !important;
        padding: 0 !important;
        opacity: 1 !important;
        font-family: Noto Sans TC, sans-serif !important;
      }

      #spotDetail .tooltip .arrow:before {
        display: none !important;
      }

      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.5s;
      }

      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }

      .hand {
        cursor: pointer;
      }

      #customdropzone {
        min-height: 208px;
        width: 100%;
        height: 100%;
        padding: 9px;
      }

      #customdropzone .dz-image-preview {
        position: relative;
        display: none;
        padding: 5px;
        width: 20%;
      }

      #customdropzone .dz-image-preview:hover .dz-hover-opacity,
      #customdropzone .dz-image-preview:hover .dz-remove {
        display: block;
      }

      #customdropzone .dz-image-preview .dz-hover-opacity {
        position: absolute;
        margin: 5px;
        top: 0;
        left: 0;
        background-color: #000;
        opacity: 0.8;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        display: none;
      }

      #customdropzone .dz-image-preview .dz-remove {
        position: absolute;
        width: 90px;
        color: #fff;
        bottom: 10px;
        left: calc(50% - 45px);
        padding: 5px;
        border: 1px solid #fff;
        font-size: 0.8rem;
        text-align: center;
        display: none;
      }

      .checkBox .form-check-label {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .checkBox .custom-control-label:before {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        background-color: #fff;
        border: 1px solid #c3c3c3;
        margin-top: 2px;
      }

      .checkBox
        .custom-checkbox
        .custom-control-input:checked
        ~ .custom-control-label:before {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        border: none;
        background-color: #00afa0;
        margin-top: 2px;
        left: -1.4rem;
      }

      #upload-spot .form-control {
        height: 100%;
        font-size: 13px;
        color: #767676;
      }

      #upload-spot .form-control,
      .regist-box .form-control {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .regist-box .form-control {
        font-size: 12px;
        text-align: left;
        color: #333;
        padding: 7px 0 7px 18px;
      }

      .regist-box .form-control::-webkit-input-placeholder {
        color: #9b9b9b;
      }

      .regist-box .form-control:-ms-input-placeholder,
      .regist-box .form-control::-ms-input-placeholder {
        color: #9b9b9b;
      }

      .regist-box .form-control::placeholder {
        color: #9b9b9b;
      }

      .error-button-box {
        margin-top: 20px;
        float: right;
      }

      .error-button-box button {
        padding: 6px 14px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .error-message {
        font-size: 14px;
        color: #333;
        font-weight: 400;
        text-align: left;
        word-break: keep-all;
        margin: 10px 10px 26px;
      }

      @media (max-width: 992px) {
        #customdropzone .dz-image-preview {
          width: 25%;
        }
      }

      @media (max-width: 768px) {
        #customdropzone .dz-image-preview {
          width: 33%;
        }
      }

      a {
        word-wrap: break-word;
        word-break: break-word;
      }

      a:active,
      a:focus,
      a:hover {
        text-decoration: none;
      }

      .form-control:focus {
        border-color: #00afa0;
        box-shadow: none;
      }

      p,
      span {
        word-wrap: break-word;
        word-break: break-word;
      }

      iframe {
        max-width: 100%;
      }

      blockquote {
        border-left: 4px solid #ccc;
        margin-bottom: 5px;
        margin-top: 5px;
        padding-left: 16px;
      }

      /*!
     * Quill Editor v1.3.6
     * https://quilljs.com/
     * Copyright (c) 2014, Jason Chen
     * Copyright (c) 2013, salesforce.com
     */

      .ql-container {
        box-sizing: border-box;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        height: 100%;
        margin: 0;
        position: relative;
      }

      .ql-container.ql-disabled .ql-tooltip {
        visibility: hidden;
      }

      .ql-container.ql-disabled .ql-editor ul[data-checked] > li:before {
        pointer-events: none;
      }

      .ql-clipboard {
        left: -100000px;
        height: 1px;
        overflow-y: hidden;
        position: absolute;
        top: 50%;
      }

      .ql-clipboard p {
        margin: 0;
        padding: 0;
      }

      .ql-editor {
        box-sizing: border-box;
        line-height: 1.42;
        height: 100%;
        outline: none;
        overflow-y: auto;
        padding: 12px 15px;
        -o-tab-size: 4;
        tab-size: 4;
        -moz-tab-size: 4;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      .ql-editor > * {
        cursor: text;
      }

      .ql-editor blockquote,
      .ql-editor h1,
      .ql-editor h2,
      .ql-editor h3,
      .ql-editor h4,
      .ql-editor h5,
      .ql-editor h6,
      .ql-editor ol,
      .ql-editor p,
      .ql-editor pre,
      .ql-editor ul {
        margin: 0;
        padding: 0;
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8
          list-9;
      }

      .ql-editor ol,
      .ql-editor ul {
        padding-left: 1.5em;
      }

      .ql-editor ol > li,
      .ql-editor ul > li {
        list-style-type: none;
      }

      .ql-editor ul > li:before {
        content: "\\2022";
      }

      .ql-editor ul[data-checked="false"],
      .ql-editor ul[data-checked="true"] {
        pointer-events: none;
      }

      .ql-editor ul[data-checked="false"] > li *,
      .ql-editor ul[data-checked="true"] > li * {
        pointer-events: all;
      }

      .ql-editor ul[data-checked="false"] > li:before,
      .ql-editor ul[data-checked="true"] > li:before {
        color: #777;
        cursor: pointer;
        pointer-events: all;
      }

      .ql-editor ul[data-checked="true"] > li:before {
        content: "\\2611";
      }

      .ql-editor ul[data-checked="false"] > li:before {
        content: "\\2610";
      }

      .ql-editor li:before {
        display: inline-block;
        white-space: nowrap;
        width: 1.2em;
      }

      .ql-editor li:not(.ql-direction-rtl):before {
        margin-left: -1.5em;
        margin-right: 0.3em;
        text-align: right;
      }

      .ql-editor li.ql-direction-rtl:before {
        margin-left: 0.3em;
        margin-right: -1.5em;
      }

      .ql-editor ol li:not(.ql-direction-rtl),
      .ql-editor ul li:not(.ql-direction-rtl) {
        padding-left: 1.5em;
      }

      .ql-editor ol li.ql-direction-rtl,
      .ql-editor ul li.ql-direction-rtl {
        padding-right: 1.5em;
      }

      .ql-editor ol li {
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8
          list-9;
        counter-increment: list-0;
      }

      .ql-editor ol li:before {
        content: counter(list-0, decimal) ". ";
      }

      .ql-editor ol li.ql-indent-1 {
        counter-increment: list-1;
      }

      .ql-editor ol li.ql-indent-1:before {
        content: counter(list-1, lower-alpha) ". ";
      }

      .ql-editor ol li.ql-indent-1 {
        counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
      }

      .ql-editor ol li.ql-indent-2 {
        counter-increment: list-2;
      }

      .ql-editor ol li.ql-indent-2:before {
        content: counter(list-2, lower-roman) ". ";
      }

      .ql-editor ol li.ql-indent-2 {
        counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
      }

      .ql-editor ol li.ql-indent-3 {
        counter-increment: list-3;
      }

      .ql-editor ol li.ql-indent-3:before {
        content: counter(list-3, decimal) ". ";
      }

      .ql-editor ol li.ql-indent-3 {
        counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
      }

      .ql-editor ol li.ql-indent-4 {
        counter-increment: list-4;
      }

      .ql-editor ol li.ql-indent-4:before {
        content: counter(list-4, lower-alpha) ". ";
      }

      .ql-editor ol li.ql-indent-4 {
        counter-reset: list-5 list-6 list-7 list-8 list-9;
      }

      .ql-editor ol li.ql-indent-5 {
        counter-increment: list-5;
      }

      .ql-editor ol li.ql-indent-5:before {
        content: counter(list-5, lower-roman) ". ";
      }

      .ql-editor ol li.ql-indent-5 {
        counter-reset: list-6 list-7 list-8 list-9;
      }

      .ql-editor ol li.ql-indent-6 {
        counter-increment: list-6;
      }

      .ql-editor ol li.ql-indent-6:before {
        content: counter(list-6, decimal) ". ";
      }

      .ql-editor ol li.ql-indent-6 {
        counter-reset: list-7 list-8 list-9;
      }

      .ql-editor ol li.ql-indent-7 {
        counter-increment: list-7;
      }

      .ql-editor ol li.ql-indent-7:before {
        content: counter(list-7, lower-alpha) ". ";
      }

      .ql-editor ol li.ql-indent-7 {
        counter-reset: list-8 list-9;
      }

      .ql-editor ol li.ql-indent-8 {
        counter-increment: list-8;
      }

      .ql-editor ol li.ql-indent-8:before {
        content: counter(list-8, lower-roman) ". ";
      }

      .ql-editor ol li.ql-indent-8 {
        counter-reset: list-9;
      }

      .ql-editor ol li.ql-indent-9 {
        counter-increment: list-9;
      }

      .ql-editor ol li.ql-indent-9:before {
        content: counter(list-9, decimal) ". ";
      }

      .ql-editor .ql-indent-1:not(.ql-direction-rtl) {
        padding-left: 3em;
      }

      .ql-editor li.ql-indent-1:not(.ql-direction-rtl) {
        padding-left: 4.5em;
      }

      .ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {
        padding-right: 3em;
      }

      .ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {
        padding-right: 4.5em;
      }

      .ql-editor .ql-indent-2:not(.ql-direction-rtl) {
        padding-left: 6em;
      }

      .ql-editor li.ql-indent-2:not(.ql-direction-rtl) {
        padding-left: 7.5em;
      }

      .ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {
        padding-right: 6em;
      }

      .ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {
        padding-right: 7.5em;
      }

      .ql-editor .ql-indent-3:not(.ql-direction-rtl) {
        padding-left: 9em;
      }

      .ql-editor li.ql-indent-3:not(.ql-direction-rtl) {
        padding-left: 10.5em;
      }

      .ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {
        padding-right: 9em;
      }

      .ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {
        padding-right: 10.5em;
      }

      .ql-editor .ql-indent-4:not(.ql-direction-rtl) {
        padding-left: 12em;
      }

      .ql-editor li.ql-indent-4:not(.ql-direction-rtl) {
        padding-left: 13.5em;
      }

      .ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {
        padding-right: 12em;
      }

      .ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {
        padding-right: 13.5em;
      }

      .ql-editor .ql-indent-5:not(.ql-direction-rtl) {
        padding-left: 15em;
      }

      .ql-editor li.ql-indent-5:not(.ql-direction-rtl) {
        padding-left: 16.5em;
      }

      .ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {
        padding-right: 15em;
      }

      .ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {
        padding-right: 16.5em;
      }

      .ql-editor .ql-indent-6:not(.ql-direction-rtl) {
        padding-left: 18em;
      }

      .ql-editor li.ql-indent-6:not(.ql-direction-rtl) {
        padding-left: 19.5em;
      }

      .ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {
        padding-right: 18em;
      }

      .ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {
        padding-right: 19.5em;
      }

      .ql-editor .ql-indent-7:not(.ql-direction-rtl) {
        padding-left: 21em;
      }

      .ql-editor li.ql-indent-7:not(.ql-direction-rtl) {
        padding-left: 22.5em;
      }

      .ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {
        padding-right: 21em;
      }

      .ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {
        padding-right: 22.5em;
      }

      .ql-editor .ql-indent-8:not(.ql-direction-rtl) {
        padding-left: 24em;
      }

      .ql-editor li.ql-indent-8:not(.ql-direction-rtl) {
        padding-left: 25.5em;
      }

      .ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {
        padding-right: 24em;
      }

      .ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {
        padding-right: 25.5em;
      }

      .ql-editor .ql-indent-9:not(.ql-direction-rtl) {
        padding-left: 27em;
      }

      .ql-editor li.ql-indent-9:not(.ql-direction-rtl) {
        padding-left: 28.5em;
      }

      .ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {
        padding-right: 27em;
      }

      .ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {
        padding-right: 28.5em;
      }

      .ql-editor .ql-video {
        display: block;
        max-width: 100%;
      }

      .ql-editor .ql-video.ql-align-center {
        margin: 0 auto;
      }

      .ql-editor .ql-video.ql-align-right {
        margin: 0 0 0 auto;
      }

      .ql-editor .ql-bg-black {
        background-color: #000;
      }

      .ql-editor .ql-bg-red {
        background-color: #e60000;
      }

      .ql-editor .ql-bg-orange {
        background-color: #f90;
      }

      .ql-editor .ql-bg-yellow {
        background-color: #ff0;
      }

      .ql-editor .ql-bg-green {
        background-color: #008a00;
      }

      .ql-editor .ql-bg-blue {
        background-color: #06c;
      }

      .ql-editor .ql-bg-purple {
        background-color: #93f;
      }

      .ql-editor .ql-color-white {
        color: #fff;
      }

      .ql-editor .ql-color-red {
        color: #e60000;
      }

      .ql-editor .ql-color-orange {
        color: #f90;
      }

      .ql-editor .ql-color-yellow {
        color: #ff0;
      }

      .ql-editor .ql-color-green {
        color: #008a00;
      }

      .ql-editor .ql-color-blue {
        color: #06c;
      }

      .ql-editor .ql-color-purple {
        color: #93f;
      }

      .ql-editor .ql-font-serif {
        font-family: Georgia, Times New Roman, serif;
      }

      .ql-editor .ql-font-monospace {
        font-family: Monaco, Courier New, monospace;
      }

      .ql-editor .ql-size-small {
        font-size: 0.75em;
      }

      .ql-editor .ql-size-large {
        font-size: 1.5em;
      }

      .ql-editor .ql-size-huge {
        font-size: 2.5em;
      }

      .ql-editor .ql-direction-rtl {
        direction: rtl;
        text-align: inherit;
      }

      .ql-editor .ql-align-center {
        text-align: center;
      }

      .ql-editor .ql-align-justify {
        text-align: justify;
      }

      .ql-editor .ql-align-right {
        text-align: right;
      }

      .ql-editor.ql-blank:before {
        color: rgba(0, 0, 0, 0.6);
        content: attr(data-placeholder);
        font-style: italic;
        left: 15px;
        pointer-events: none;
        position: absolute;
        right: 15px;
      }

      /*!
     * froala_editor v2.8.5 (https://www.froala.com/wysiwyg-editor)
     * License https://froala.com/wysiwyg-editor/terms/
     * Copyright 2014-2018 Froala Labs
     */

      .clearfix:after {
        clear: both;
        display: block;
        content: "";
        height: 0;
      }

      .hide-by-clipping {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      .fr-img-caption.fr-rounded img,
      img.fr-rounded {
        border-radius: 10px;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
        background-clip: padding-box;
      }

      .fr-img-caption.fr-bordered img,
      img.fr-bordered {
        border: 5px solid #ccc;
      }

      img.fr-bordered {
        box-sizing: content-box;
      }

      .fr-img-caption.fr-bordered img {
        box-sizing: border-box;
      }

      .fr-img-caption.fr-shadow img,
      img.fr-shadow {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
          0 1px 1px 1px rgba(0, 0, 0, 0.16);
      }

      .fr-view {
        word-wrap: break-word;
      }

      .fr-view span[style~="color:"] a {
        color: inherit;
      }

      .fr-view strong {
        font-weight: 700;
      }

      .fr-view table {
        border: 0;
        border-collapse: collapse;
        empty-cells: show;
        max-width: 100%;
      }

      .fr-view table td {
        min-width: 5px;
      }

      .fr-view table.fr-dashed-borders td,
      .fr-view table.fr-dashed-borders th {
        border-style: dashed;
      }

      .fr-view table.fr-alternate-rows tbody tr:nth-child(2n) {
        background: #f5f5f5;
      }

      .fr-view table td,
      .fr-view table th {
        border: 1px solid #ddd;
      }

      .fr-view table td:empty,
      .fr-view table th:empty {
        height: 20px;
      }

      .fr-view table td.fr-highlighted,
      .fr-view table th.fr-highlighted {
        border: 1px double red;
      }

      .fr-view table td.fr-thick,
      .fr-view table th.fr-thick {
        border-width: 2px;
      }

      .fr-view table th {
        background: #e6e6e6;
      }

      .fr-view hr {
        clear: both;
        user-select: none;
        -o-user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        page-break-after: always;
      }

      .fr-view .fr-file {
        position: relative;
      }

      .fr-view .fr-file:after {
        position: relative;
        content: "\\1F4CE";
        font-weight: 400;
      }

      .fr-view pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: visible;
      }

      .fr-view[dir="rtl"] blockquote {
        border-left: 0;
        border-right: 2px solid #5e35b1;
        margin-right: 0;
        padding-right: 5px;
        padding-left: 0;
      }

      .fr-view[dir="rtl"] blockquote blockquote {
        border-color: #00bcd4;
      }

      .fr-view[dir="rtl"] blockquote blockquote blockquote {
        border-color: #43a047;
      }

      .fr-view blockquote {
        border-left: 2px solid #5e35b1;
        margin-left: 0;
        padding-left: 5px;
        color: #5e35b1;
      }

      .fr-view blockquote blockquote {
        border-color: #00bcd4;
        color: #00bcd4;
      }

      .fr-view blockquote blockquote blockquote {
        border-color: #43a047;
        color: #43a047;
      }

      .fr-view span.fr-emoticon {
        font-weight: 400;
        font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji,
          Segoe UI Symbol, Android Emoji, EmojiSymbols;
        display: inline;
        line-height: 0;
      }

      .fr-view span.fr-emoticon.fr-emoticon-img {
        background-repeat: no-repeat !important;
        font-size: inherit;
        height: 1em;
        width: 1em;
        min-height: 20px;
        min-width: 20px;
        display: inline-block;
        margin: -0.1em 0.1em 0.1em;
        line-height: 1;
        vertical-align: middle;
      }

      .fr-view .fr-text-gray {
        color: #aaa !important;
      }

      .fr-view .fr-text-bordered {
        border-top: 1px solid #222;
        border-bottom: 1px solid #222;
        padding: 10px 0;
      }

      .fr-view .fr-text-spaced {
        letter-spacing: 1px;
      }

      .fr-view .fr-text-uppercase {
        text-transform: uppercase;
      }

      .fr-view img {
        position: relative;
        max-width: 100%;
      }

      .fr-view img.fr-dib {
        margin: 5px auto;
        display: block;
        float: none;
        vertical-align: top;
      }

      .fr-view img.fr-dib.fr-fil {
        margin-left: 0;
        text-align: left;
      }

      .fr-view img.fr-dib.fr-fir {
        margin-right: 0;
        text-align: right;
      }

      .fr-view img.fr-dii {
        display: inline-block;
        float: none;
        vertical-align: bottom;
        margin-left: 5px;
        margin-right: 5px;
        max-width: calc(100% - 10px);
      }

      .fr-view img.fr-dii.fr-fil {
        float: left;
        margin: 5px 5px 5px 0;
        max-width: calc(100% - 5px);
      }

      .fr-view img.fr-dii.fr-fir {
        float: right;
        margin: 5px 0 5px 5px;
        max-width: calc(100% - 5px);
      }

      .fr-view span.fr-img-caption {
        position: relative;
        max-width: 100%;
      }

      .fr-view span.fr-img-caption.fr-dib {
        margin: 5px auto;
        display: block;
        float: none;
        vertical-align: top;
      }

      .fr-view span.fr-img-caption.fr-dib.fr-fil {
        margin-left: 0;
        text-align: left;
      }

      .fr-view span.fr-img-caption.fr-dib.fr-fir {
        margin-right: 0;
        text-align: right;
      }

      .fr-view span.fr-img-caption.fr-dii {
        display: inline-block;
        float: none;
        vertical-align: bottom;
        margin-left: 5px;
        margin-right: 5px;
        max-width: calc(100% - 10px);
      }

      .fr-view span.fr-img-caption.fr-dii.fr-fil {
        float: left;
        margin: 5px 5px 5px 0;
        max-width: calc(100% - 5px);
      }

      .fr-view span.fr-img-caption.fr-dii.fr-fir {
        float: right;
        margin: 5px 0 5px 5px;
        max-width: calc(100% - 5px);
      }

      .fr-view .fr-video {
        text-align: center;
        position: relative;
      }

      .fr-view .fr-video > * {
        box-sizing: content-box;
        max-width: 100%;
        border: 0;
      }

      .fr-view .fr-video.fr-dvb {
        display: block;
        clear: both;
      }

      .fr-view .fr-video.fr-dvb.fr-fvl {
        text-align: left;
      }

      .fr-view .fr-video.fr-dvb.fr-fvr {
        text-align: right;
      }

      .fr-view .fr-video.fr-dvi {
        display: inline-block;
      }

      .fr-view .fr-video.fr-dvi.fr-fvl {
        float: left;
      }

      .fr-view .fr-video.fr-dvi.fr-fvr {
        float: right;
      }

      .fr-view a.fr-strong {
        font-weight: 700;
      }

      .fr-view a.fr-green {
        color: green;
      }

      .fr-view .fr-img-caption {
        text-align: center;
      }

      .fr-view .fr-img-caption .fr-img-wrap {
        padding: 0;
        display: inline-block;
        margin: auto;
        text-align: center;
        width: 100%;
      }

      .fr-view .fr-img-caption .fr-img-wrap img {
        display: block;
        margin: auto;
        width: 100%;
      }

      .fr-view .fr-img-caption .fr-img-wrap > span {
        margin: auto;
        display: block;
        padding: 5px 5px 10px;
        font-size: 14px;
        font-weight: 400;
        box-sizing: border-box;
        -webkit-opacity: 0.9;
        -moz-opacity: 0.9;
        opacity: 0.9;
        -ms-filter: "alpha(Opacity=0)";
        width: 100%;
        text-align: center;
      }

      .fr-view button.fr-rounded,
      .fr-view input.fr-rounded,
      .fr-view textarea.fr-rounded {
        border-radius: 10px;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
        background-clip: padding-box;
      }

      .fr-view button.fr-large,
      .fr-view input.fr-large,
      .fr-view textarea.fr-large {
        font-size: 24px;
      }

      a.fr-view.fr-strong {
        font-weight: 700;
      }

      a.fr-view.fr-green {
        color: green;
      }

      img.fr-view {
        position: relative;
        max-width: 100%;
      }

      img.fr-view.fr-dib {
        margin: 5px auto;
        display: block;
        float: none;
        vertical-align: top;
      }

      img.fr-view.fr-dib.fr-fil {
        margin-left: 0;
        text-align: left;
      }

      img.fr-view.fr-dib.fr-fir {
        margin-right: 0;
        text-align: right;
      }

      img.fr-view.fr-dii {
        display: inline-block;
        float: none;
        vertical-align: bottom;
        margin-left: 5px;
        margin-right: 5px;
        max-width: calc(100% - 10px);
      }

      img.fr-view.fr-dii.fr-fil {
        float: left;
        margin: 5px 5px 5px 0;
        max-width: calc(100% - 5px);
      }

      img.fr-view.fr-dii.fr-fir {
        float: right;
        margin: 5px 0 5px 5px;
        max-width: calc(100% - 5px);
      }

      span.fr-img-caption.fr-view {
        position: relative;
        max-width: 100%;
      }

      span.fr-img-caption.fr-view.fr-dib {
        margin: 5px auto;
        display: block;
        float: none;
        vertical-align: top;
      }

      span.fr-img-caption.fr-view.fr-dib.fr-fil {
        margin-left: 0;
        text-align: left;
      }

      span.fr-img-caption.fr-view.fr-dib.fr-fir {
        margin-right: 0;
        text-align: right;
      }

      span.fr-img-caption.fr-view.fr-dii {
        display: inline-block;
        float: none;
        vertical-align: bottom;
        margin-left: 5px;
        margin-right: 5px;
        max-width: calc(100% - 10px);
      }

      span.fr-img-caption.fr-view.fr-dii.fr-fil {
        float: left;
        margin: 5px 5px 5px 0;
        max-width: calc(100% - 5px);
      }

      span.fr-img-caption.fr-view.fr-dii.fr-fir {
        float: right;
        margin: 5px 0 5px 5px;
        max-width: calc(100% - 5px);
      }

      #sidebar {
        width: 240px;
        position: fixed;
        top: 70px;
        left: 0;
        height: calc(100vh - 70px);
        z-index: 998;
      }

      #sidebar.hide {
        margin-left: -240px;
      }

      #content {
        width: calc(100% - 240px);
        padding: 50px;
        min-height: calc(100vh - 70px);
        transition: all 0.3s;
        position: absolute;
        top: 70px;
        right: 0;
      }

      #content.active {
        width: 100%;
      }

      @media (max-width: 768px) {
        #sidebar {
          margin-left: -240px;
        }

        #sidebar.hide {
          margin-left: 0;
        }

        #content {
          padding: 50px 30px;
          width: 100%;
        }
      }

      @media (max-width: 621px) {
        #sidebar {
          top: 0;
          left: 0;
          padding: 0;
          z-index: 1200;
        }

        #sidebar.hide {
          position: relative;
          min-height: 100vh;
          height: auto;
          width: 100vw;
          background-color: rgba(0, 0, 0, 0.8);
        }

        #content.active {
          min-height: 0;
          height: calc(100% - 70px);
          overflow: hidden;
        }

        .overlay {
          z-index: 1199;
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          display: block;
          background-color: rgba(0, 0, 0, 0.8);
          overflow: hidden;
        }
      }

      @media (max-width: 576px) {
        #sidebar {
          margin-left: -240px;
        }

        #sidebar.hide {
          margin-left: 0;
        }

        #content {
          padding: 50px 18px;
          width: 100%;
        }
      }

      #gnb[data-v-54066900] {
        z-index: 999;
        height: 70px;
        background-color: #fff;
        box-shadow: 0 3px 5px 0 rgba(6, 3, 3, 0.05);
        padding: 0 28px;
        width: 100%;
      }

      #gnb a[data-v-54066900]:hover {
        text-decoration: none;
      }

      .menu-left .logo[data-v-54066900] {
        width: 96px;
        height: 27px;
        -o-object-fit: contain;
        object-fit: contain;
        margin-left: 31px;
        margin-right: 60px;
      }

      .menu-item[data-v-54066900] {
        margin-right: 30px;
        min-width: 72px;
        word-break: keep-all;
      }

      .user-drop-item[data-v-54066900] {
        min-width: 164px;
        padding: 10px 0;
        cursor: pointer;
      }

      .user-drop-item[data-v-54066900],
      .user-drop-item a[data-v-54066900] {
        font-size: 14px !important;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676 !important;
      }

      .user-drop-item[data-v-54066900]:hover,
      .user-drop-item a[data-v-54066900]:hover {
        text-decoration: none;
      }

      .popover-body[data-v-54066900] {
        padding: 0 !important;
      }

      .upload-spot-btn[data-v-54066900] {
        width: 184px;
        height: 45px;
        border-radius: 4px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        font-size: 18px;
        font-weight: 500;
      }

      .login-btn[data-v-54066900] {
        min-width: 101px;
        height: 45px;
      }

      .my-page-btn[data-v-54066900] {
        padding: 14px 18px;
      }

      @media (max-width: 621px) {
        .menu-item[data-v-54066900] {
          margin-right: 10px;
        }

        .menu-center[data-v-54066900],
        .menu-right[data-v-54066900],
        .search-box[data-v-54066900] {
          display: none;
        }

        .search-btn[data-v-54066900] {
          display: inline-flex;
          justify-content: end;
          height: 48px;
          border-radius: 2px;
          width: 48px;
        }

        .isSideShow[data-v-54066900] {
          position: absolute;
        }
      }

      @media (min-width: 620px) {
        .menu-item[data-v-54066900] {
          margin-right: 10px;
        }

        .menu-center[data-v-54066900],
        .menu-right[data-v-54066900] {
          display: none;
        }

        .search-box[data-v-54066900] {
          display: inline-flex;
        }

        .search-btn[data-v-54066900] {
          display: none;
        }
      }

      @media (min-width: 900px) {
        .menu-item[data-v-54066900] {
          margin-right: 20px;
        }

        .menu-center[data-v-54066900] {
          display: inline-flex;
        }

        .menu-right[data-v-54066900],
        .search-btn[data-v-54066900] {
          display: none;
        }
      }

      @media (min-width: 1220px) {
        .menu-item[data-v-54066900] {
          margin-right: 30px;
        }

        .menu-center[data-v-54066900],
        .menu-right[data-v-54066900] {
          display: inline-flex;
        }

        .search-btn[data-v-54066900] {
          display: none;
        }

        .search-box[data-v-54066900] {
          min-width: 350px;
        }
      }

      @media (min-width: 1450px) {
        .menu-item[data-v-54066900] {
          margin-right: 40px;
        }

        .menu-center[data-v-54066900],
        .menu-right[data-v-54066900] {
          display: inline-flex;
        }

        .search-box[data-v-54066900] {
          width: 700px;
        }

        .search-btn[data-v-54066900] {
          display: none;
        }
      }

      @media (min-width: 1900px) {
        .menu-item[data-v-54066900] {
          margin-right: 80px;
        }

        .menu-center[data-v-54066900],
        .menu-right[data-v-54066900] {
          display: inline-flex;
        }

        .search-box[data-v-54066900] {
          width: 900px;
        }

        .search-btn[data-v-54066900] {
          display: none;
        }
      }

      a[data-v-54066900] {
        color: #333;
      }

      .nuxt-link-active[data-v-54066900],
      a[data-v-54066900] {
        font-size: 18px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .nuxt-link-active[data-v-54066900] {
        color: #00afa0;
      }

      .overlay[data-v-54066900] {
        z-index: 9999;
        width: 100%;
        height: 100%;
        display: none;
      }

      .overlay .close[data-v-54066900] {
        position: absolute;
        top: 0;
        right: 0;
        padding: 11px;
        float: none;
        font-size: 20px;
        font-weight: 700;
        line-height: 1;
        color: #767676;
      }

      .overlay.show[data-v-54066900] {
        position: fixed;
        top: 0;
        left: 0;
        display: block;
        background-color: #fff;
      }

      .overlay.show .mobile-search-box[data-v-54066900] {
        padding: 24px 18px;
      }

      @media (max-width: 576px) {
        #gnb[data-v-54066900] {
          padding: 0 18px;
        }
      }

      .nav-search-box {
        background-color: #fff;
        height: 48px;
      }

      .nav-search-box .search-form-input {
        width: 50%;
      }

      .nav-search-box .search-form-input input {
        background-color: #f5f5f5;
        border: 0;
        border-radius: 0;
        height: 48px;
        width: 100%;
        font-size: 16px;
        padding: 12px 18px;
        border-radius: 2px 0 0 2px !important;
      }

      .nav-search-box .search-form-input input::-webkit-input-placeholder {
        color: #9b9b9b;
      }

      .nav-search-box .search-form-input input:-ms-input-placeholder,
      .nav-search-box .search-form-input input::-ms-input-placeholder {
        color: #9b9b9b;
      }

      .nav-search-box .search-form-input input::placeholder {
        color: #9b9b9b;
      }

      .nav-search-box .search-form-input input:focus {
        box-shadow: none !important;
        outline: none !important;
      }

      .nav-search-box .search-form-spot {
        width: 30%;
      }

      .nav-search-box .search-form-spot input {
        border: 0;
        border-radius: 0;
        height: 48px;
        width: 100%;
        padding-left: 38px;
        font-size: 16px;
        background: url(/_nuxt/img/spot.da3a5b5.svg) no-repeat 14px #f5f5f5;
      }

      .nav-search-box .search-form-spot input:focus {
        box-shadow: none !important;
        outline: none !important;
      }

      .nav-search-box .wrap-search-input-bar {
        background-color: #f5f5f5;
        height: 48px;
        padding: 0 4px;
      }

      .nav-search-box .search-input-bar {
        background-color: #d8d8d8;
        width: 1.5px;
        height: 38px;
      }

      .nav-search-box .search-btn {
        display: inline-flex;
        justify-content: end;
        height: 48px;
        border-radius: 2px;
        width: 48px;
      }

      .open .dropdown-menu .word-search {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .open .dropdown-menu[data-v-3dff14a3] {
        display: block;
        background-color: #f5f5f5;
        width: calc(100% + 4px);
        border-radius: 4px;
        box-shadow: 1px 0 3px 1px rgba(0, 0, 0, 0.15);
        padding: 20px 0 0;
        max-height: 1000%;
        overflow-y: auto;
      }

      .open .dropdown-menu li[data-v-3dff14a3] {
        display: list-item;
        text-align: -webkit-match-parent;
        padding: 7px 18px;
        background-color: #f5f5f5;
        color: #000;
      }

      .open .dropdown-menu li[data-v-3dff14a3]:hover {
        cursor: pointer;
        background-color: #ebebeb;
        color: #000;
      }

      .open .dropdown-menu li:hover .item[data-v-3dff14a3] {
        color: #000;
      }

      .open .dropdown-menu .lists[data-v-3dff14a3] {
        font-size: 0.8em;
      }

      .open .dropdown-menu .divider-warp[data-v-3dff14a3] {
        padding: 13px 0;
      }

      .open .dropdown-menu .divider-warp[data-v-3dff14a3]:hover {
        cursor: auto;
        background-color: transparent;
      }

      .open .dropdown-menu .divider-warp .divider[data-v-3dff14a3] {
        border-bottom: 1px solid #d8d8d8;
      }

      .open .dropdown-menu .label[data-v-3dff14a3] {
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
        padding-bottom: 12px;
      }

      .open .dropdown-menu .label[data-v-3dff14a3]:hover {
        cursor: auto;
        background-color: #f5f5f5;
        color: #767676;
      }

      .open .dropdown-menu .suggestionSearch[data-v-3dff14a3] {
        padding: 16px 18px;
      }

      .open .dropdown-menu .suggestionSearch .label[data-v-3dff14a3]:hover {
        cursor: pointer;
        background-color: #ebebeb;
        color: #767676;
      }

      .open .dropdown-menu .active[data-v-3dff14a3] {
        background-color: #ebebeb;
        color: #fff;
      }

      .open .dropdown-menu .item[data-v-3dff14a3] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .mobile-nav-search-box {
        position: relative;
        background-color: #fff;
      }

      .mobile-nav-search-box input {
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #d8d8d8;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .mobile-nav-search-box input:focus {
        outline: 0;
        box-shadow: none;
      }

      .mobile-nav-search-box .search-btn {
        margin-top: 30px;
      }

      .mobile-nav-search-box .name-search input {
        color: #333;
      }

      .mobile-nav-search-box .name-search input::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      .mobile-nav-search-box .name-search input:-ms-input-placeholder,
      .mobile-nav-search-box .name-search input::-ms-input-placeholder {
        color: #c3c3c3;
      }

      .mobile-nav-search-box .name-search input::placeholder {
        color: #c3c3c3;
      }

      .mobile-nav-search-box .city-search input {
        color: #767676;
      }

      .mobile-nav-search-box .city-search input::-webkit-input-placeholder {
        color: #c3c3c3;
      }

      .mobile-nav-search-box .city-search input:-ms-input-placeholder,
      .mobile-nav-search-box .city-search input::-ms-input-placeholder {
        color: #c3c3c3;
      }

      .mobile-nav-search-box .city-search input::placeholder {
        color: #c3c3c3;
      }

      .mobile-nav-search-box .arrow-icon {
        position: absolute;
        margin-right: 5px;
        bottom: 13px;
        right: 0;
      }

      .pt-29px[data-v-beb43e1c] {
        padding-top: 29px !important;
      }

      .pb-5px[data-v-beb43e1c] {
        padding-bottom: 5px !important;
      }

      .pb-35px[data-v-beb43e1c] {
        padding-bottom: 35px !important;
      }

      .side-back[data-v-beb43e1c] {
        background: #f5f5f5;
      }

      .nuxt-link-exact-active .link-btn[data-v-beb43e1c] {
        background-color: #ebebeb !important;
      }

      .side-dark[data-v-beb43e1c] {
        background-color: #ebebeb;
        margin: 0 !important;
        color: #767676;
      }

      .side-dark li[data-v-beb43e1c] {
        padding: 20px 28px;
      }

      .side-dark .border-bottom[data-v-beb43e1c] {
        border-bottom: 1px #c3c3c3;
      }

      .display-web[data-v-beb43e1c] {
        display: block;
      }

      .margin-1[data-v-beb43e1c] {
        margin-top: -1px;
      }

      .sideBarWarp[data-v-beb43e1c] {
        height: 100%;
        bottom: 0;
        padding-top: 30px;
        background: #f5f5f5;
        overflow: auto;
      }

      .sidebar-header[data-v-beb43e1c] {
        padding: 0 28px;
      }

      .no-deco-line[data-v-beb43e1c]:active,
      .no-deco-line[data-v-beb43e1c]:hover {
        text-decoration: none;
      }

      .btn-side-bar[data-v-beb43e1c] {
        width: 184px;
        border-radius: 4px !important;
        font-size: 18px;
        font-weight: 500;
        height: 45px;
      }

      .app-down-btn[data-v-beb43e1c] {
        display: none;
        padding: 0 28px 40px;
      }

      .app-down-btn .btn-side-bar[data-v-beb43e1c] {
        color: #333;
        font-weight: 400;
        border: 1px solid #00afa0;
      }

      .gnb-mypage[data-v-beb43e1c] {
        margin-bottom: 16px;
      }

      .nickname-box[data-v-beb43e1c] {
        max-width: 100%;
        height: 27px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .nickname-box a[data-v-beb43e1c] {
        vertical-align: super;
      }

      .interest-edit-text[data-v-beb43e1c] {
        font-family: Raleway;
        cursor: pointer;
      }

      .edit-text[data-v-beb43e1c],
      .interest-edit-text[data-v-beb43e1c] {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #9b9b9b;
      }

      .margin-menu[data-v-beb43e1c] {
        padding-top: 20px !important;
      }

      .primary-menu[data-v-beb43e1c] {
        padding: 5px 28px;
      }

      .primary-menu a[data-v-beb43e1c] {
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .primary-menu a[data-v-beb43e1c]:hover {
        text-decoration: none;
        background-color: #f5f5f5 !important;
      }

      .primary-menu button[data-v-beb43e1c] {
        background-color: transparent;
      }

      .primary-menu button[data-v-beb43e1c]:hover {
        text-decoration: none;
        background-color: #f5f5f5 !important;
      }

      .more-margin[data-v-beb43e1c] {
        padding-bottom: 21px;
      }

      .primary-text[data-v-beb43e1c] {
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
      }

      .show-more[data-v-beb43e1c] {
        padding: 5px 28px;
      }

      .sub-menu button[data-v-beb43e1c] {
        padding: 5px 28px;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
        background-color: transparent;
      }

      .sub-menu button[data-v-beb43e1c]:hover {
        background-color: #ebebeb;
      }

      .side-about-us[data-v-beb43e1c] {
        font-family: Raleway;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        padding: 10px 0 40px;
      }

      .side-about-us .about-us-menu[data-v-beb43e1c] {
        padding: 3px 28px;
      }

      .side-about-us .about-us-menu a[data-v-beb43e1c],
      .side-about-us .about-us-menu span[data-v-beb43e1c] {
        font-family: Raleway;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
      }

      .side-about-us .about-us-menu a[data-v-beb43e1c]:hover,
      .side-about-us .about-us-menu span[data-v-beb43e1c]:hover {
        background-color: #f5f5f5 !important;
      }

      .side-about-us .copy-creatrip[data-v-beb43e1c] {
        margin-top: 30px;
      }

      .side-about-us .copy-creatrip span[data-v-beb43e1c] {
        font-weight: 500;
      }

      .bottom-text[data-v-beb43e1c] {
        font-size: 18px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #767676;
        padding: 0 28px;
      }

      @media (max-width: 621px) {
        .sidebar[data-v-beb43e1c] {
          width: 240px;
          min-height: 100vh;
          background: #f5f5f5;
          padding: 30px 0 0;
        }

        .sideBarWarp[data-v-beb43e1c] {
          overflow: visible;
        }

        .side-about-us[data-v-beb43e1c] {
          display: none;
        }

        .app-down-btn[data-v-beb43e1c] {
          display: block;
        }

        .display-web[data-v-beb43e1c] {
          display: none;
        }

        .gnb-menu-list[data-v-beb43e1c] {
          padding-top: 15px;
        }

        .gnb-menu-list .primary-menu[data-v-beb43e1c] {
          padding: 20px 0 0 28px;
        }

        .primary-menu[data-v-beb43e1c] {
          padding: 5px 28px;
        }

        .sidebar-header[data-v-beb43e1c] {
          padding: 0 28px;
        }
      }

      @media (min-width: 620px) {
        .side-about-us[data-v-beb43e1c] {
          display: none;
        }

        .app-down-btn[data-v-beb43e1c] {
          display: block;
        }

        .display-web[data-v-beb43e1c] {
          display: none;
        }
      }

      @media (min-width: 900px) {
        .gnb-menu-list[data-v-beb43e1c],
        .side-about-us[data-v-beb43e1c] {
          display: none;
        }

        .app-down-btn[data-v-beb43e1c],
        .display-web[data-v-beb43e1c] {
          display: block;
        }
      }

      @media (min-width: 1220px) {
        .gnb-mypage[data-v-beb43e1c] {
          display: none;
        }

        .side-about-us[data-v-beb43e1c] {
          display: block;
        }

        .app-down-btn[data-v-beb43e1c],
        .user-profile[data-v-beb43e1c] {
          display: none;
        }

        .display-web[data-v-beb43e1c] {
          display: block;
        }
      }

      .language-dropdown {
        width: 100%;
      }

      .language-dropdown button.dropdown-toggle {
        width: 100% !important;
        border: 1px solid #c3c3c3 !important;
        border-radius: 4px !important;
        font-size: 14px !important;
        background-color: #fff !important;
        text-align: left;
        color: #9b9b9b !important;
      }

      .language-dropdown button.dropdown-toggle:after {
        font-family: MaterialCommunityIcons;
        position: absolute;
        right: 20px;
        margin-left: 0;
        content: "\\F107" !important;
        border: none !important;
        vertical-align: 0.26em !important;
      }

      .language-dropdown .dropdown-menu {
        width: 100% !important;
        border: 1px solid #c3c3c3 !important;
        border-radius: 4px !important;
        background-color: #fff !important;
        margin-top: 0 !important;
      }

      .language-dropdown .dropdown-menu .dropdown-item {
        color: #9b9b9b !important;
        font-size: 14px !important;
      }

      .language-dropdown .dropdown-menu .dropdown-item:active {
        color: #9b9b9b !important;
        background: transparent !important;
        font-size: 14px !important;
      }

      .screen[data-v-5266200d] {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: hsla(0, 0%, 100%, 0.7);
        text-align: center;
        vertical-align: center;
        z-index: 9998;
      }

      .screen .spinner[data-v-5266200d] {
        position: absolute;
        z-index: 9999;
        top: 50%;
        left: 50%;
        text-align: center;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
      }

      .background[data-v-39a0f1a6] {
        z-index: 10000;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        text-align: center;
        vertical-align: middle;
        background-color: rgba(0, 0, 0, 0.7);
        display: table-cell;
      }

      .interest-box[data-v-39a0f1a6] {
        position: absolute;
        width: 100%;
        max-width: 375px;
        height: 620px;
        padding-top: 40px;
        background-color: #fff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
        top: 50%;
        left: 50%;
        text-align: center;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }

      .interest-box .input-box[data-v-39a0f1a6] {
        margin-left: 28px;
        margin-right: 28px;
        margin-bottom: 40px;
        border-bottom: 1px solid #d8d8d8 !important;
      }

      .interest-box .input-box button[data-v-39a0f1a6] {
        padding: 0;
        margin: 0;
      }

      .interest-box .input-box button img[data-v-39a0f1a6] {
        width: 14px;
        height: 14px;
      }

      .interest-box .close[data-v-39a0f1a6] {
        position: absolute;
        top: 0;
        right: 0;
        padding: 11px;
        float: none;
        font-size: 20px;
        font-weight: 700;
        line-height: 1;
        color: #767676;
        text-decoration: none;
      }

      .interest-box .close[data-v-39a0f1a6]:active {
        border: none;
        text-decoration: none;
      }

      .interest-box .title[data-v-39a0f1a6] {
        position: relative;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: center;
        margin-bottom: 40px;
        color: #333;
      }

      .interest-box .box-container[data-v-39a0f1a6] {
        width: calc(100% - 56px);
        height: 330px;
        margin-left: 28px;
        margin-bottom: 40px;
        overflow-y: scroll;
      }

      .interest-box .box-container[data-v-39a0f1a6]::-webkit-scrollbar {
        width: 0;
      }

      .interest-box .box-container[data-v-39a0f1a6]:last-child {
        border-bottom: none;
      }

      .interest-box .box-container .box[data-v-39a0f1a6] {
        width: 100%;
        height: 52px;
        margin-bottom: 10px;
        border-radius: 4px;
        background-color: #f5f5f5;
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #fff;
      }

      .interest-box .box-container .box .city-select[data-v-39a0f1a6] {
        background-color: #fdca04;
        padding: 6px 14px;
        float: left;
      }

      .interest-box .box-container .box .delete-button[data-v-39a0f1a6] {
        margin-top: 2px;
        margin-right: 2px;
        margin-bottom: 5px;
        padding: 0;
        float: right;
        text-decoration: none;
        font-size: 20px;
        line-height: 1;
        color: #9b9b9b;
      }

      .interest-box .box-container .box .delete-button img[data-v-39a0f1a6] {
        width: 25px;
        height: 23px;
      }

      .interest-box .button-box[data-v-39a0f1a6] {
        margin-left: 28px;
        margin-top: 8px;
        width: 100%;
        height: 30px;
      }

      .interest-box .button-box .confirm-button[data-v-39a0f1a6] {
        padding: 6px 14px;
        float: left;
      }

      .interest-box .error-message[data-v-39a0f1a6] {
        margin-left: 28px;
        width: 100%;
      }

      .interest-box .error-message span[data-v-39a0f1a6] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: -0.2px;
        color: #d0021b;
      }

      @media (max-width: 576px) {
        .interest-box[data-v-39a0f1a6] {
          position: static;
          top: 0;
          left: 0;
          margin: 0;
          width: 100%;
          max-width: 100%;
          height: 100vh;
          max-height: 100vh;
          overflow-x: hidden;
          overflow-y: auto;
          -webkit-transform: translate(0);
          transform: translate(0);
          background-color: #fff;
        }
      }

      .background[data-v-23dc6e91] {
        z-index: 10000;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        vertical-align: center;
        background-color: rgba(0, 0, 0, 0.7);
      }

      .login-box[data-v-23dc6e91] {
        position: relative;
        margin: 130px auto;
        text-align: center;
        overflow-x: hidden;
        width: 100%;
        max-width: 375px;
        padding: 40px 0;
        -webkit-transform: translate(0);
        transform: translate(0);
        background-color: #fff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
      }

      .login-box .title[data-v-23dc6e91] {
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #333;
        text-align: center;
        margin: 0 auto;
      }

      .login-box .close[data-v-23dc6e91] {
        position: absolute;
        top: 0;
        right: 0;
        padding: 11px;
        float: none;
        font-size: 20px;
        font-weight: 700;
        line-height: 1;
        color: #767676;
      }

      .oauth-panel[data-v-23dc6e91] {
        width: 220px;
        margin: 40px auto 0;
      }

      .bottom-line[data-v-23dc6e91] {
        margin: 34px auto 0;
        width: 170px;
        border-bottom: 1px solid #e2e2e2;
      }

      .login-panel[data-v-23dc6e91] {
        margin: 34px auto 0;
        width: 220px;
      }

      .login-panel .reset-password[data-v-23dc6e91] {
        vertical-align: top;
      }

      .login-panel > div[data-v-23dc6e91]:first-child {
        padding: 0;
        margin: 34px auto 0;
      }

      .login-text[data-v-23dc6e91] {
        font-size: 14px;
      }

      .login-input[data-v-23dc6e91],
      .login-text[data-v-23dc6e91] {
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
      }

      .login-input[data-v-23dc6e91] {
        width: 100%;
        height: 32px;
        margin: 10px 0;
        font-family: Raleway;
        font-size: 13px;
      }

      .login-input[data-v-23dc6e91]::-webkit-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .login-input[data-v-23dc6e91]:-moz-placeholder,
      .login-input[data-v-23dc6e91]::-moz-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .login-input[data-v-23dc6e91]:-ms-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .link-button[data-v-23dc6e91] {
        padding: 0;
        letter-spacing: -0.2px;
      }

      .link-button[data-v-23dc6e91],
      .oauth-text-box[data-v-23dc6e91] {
        color: #9b9b9b;
        text-align: left;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
      }

      .oauth-text-box[data-v-23dc6e91] {
        margin: 4px 0 0;
        letter-spacing: normal;
      }

      .oauth-text-box .link[data-v-23dc6e91] {
        color: #00afa0;
        text-decoration: none;
      }

      .oauth-text-box .link[data-v-23dc6e91]:hover {
        cursor: pointer;
        text-decoration: underline;
        color: #00afa0;
      }

      .join-panel-email[data-v-23dc6e91] {
        margin: 10px 0 0;
      }

      .join-panel-email .checkEmail[data-v-23dc6e91] {
        position: absolute;
        top: 0;
        right: -20px;
      }

      .join-panel-password[data-v-23dc6e91] {
        margin: 10px 0;
      }

      .join-panel-password .togglePassword[data-v-23dc6e91] {
        position: absolute;
        top: 0;
        right: -22px;
      }

      .join-input[data-v-23dc6e91] {
        width: 100%;
        height: 32px;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #333;
      }

      .join-input[data-v-23dc6e91]::-webkit-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .join-input[data-v-23dc6e91]:-moz-placeholder,
      .join-input[data-v-23dc6e91]::-moz-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .join-input[data-v-23dc6e91]:-ms-input-placeholder {
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        color: #c3c3c3;
      }

      .errorEmail[data-v-23dc6e91]:focus {
        border-color: red;
        box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
      }

      .join-button[data-v-23dc6e91] {
        height: 32px;
      }

      .login-button[data-v-23dc6e91] {
        padding: 6px 14px;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        color: #fff;
      }

      .login-fail-message[data-v-23dc6e91] {
        position: absolute;
        bottom: 16px;
        width: 100%;
        text-align: center;
      }

      .login-fail-message span[data-v-23dc6e91] {
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: -0.2px;
        color: #d0021b;
      }

      .login-fail-message .reset-password[data-v-23dc6e91] {
        margin-bottom: 25px;
      }

      .login-fail-message .link[data-v-23dc6e91] {
        text-decoration: underline;
      }

      .login-fail-message .link[data-v-23dc6e91]:hover {
        cursor: pointer;
      }

      @media (max-width: 576px) {
        .login-box[data-v-23dc6e91] {
          margin: 0 auto;
          width: 100%;
          max-width: 100vw;
          height: 100%;
          min-height: 100%;
          overflow-x: hidden;
          -webkit-transform: translate(0);
          transform: translate(0);
          background-color: #fff;
        }
      }

      .intro {
        position: absolute;
        background-color: #e2efee;
        width: 100%;
        height: 100vh;
        overflow: auto;
      }

      @media (max-width: 576px) {
        .intro {
          background-color: #fff;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }

      #sidebar {
        width: 240px;
        position: fixed;
        top: 70px;
        left: 0;
        height: calc(100vh - 70px);
        z-index: 998;
      }

      #sidebar.hide {
        margin-left: -240px;
      }

      #content {
        min-height: 100vh;
        transition: all 0.3s;
        position: absolute;
        top: 0;
        right: 0;
      }

      #content,
      #content.active {
        width: 100%;
      }

      @media (max-width: 768px) {
        #sidebar {
          margin-left: -240px;
        }

        #sidebar.hide {
          margin-left: 0;
        }

        #content {
          padding: 18px;
          width: 100%;
        }
      }

      @media (max-width: 621px) {
        #sidebar {
          top: 0;
          left: 0;
          padding: 0;
          z-index: 1200;
        }

        #sidebar.hide {
          position: relative;
          min-height: 100vh;
          height: auto;
          width: 100vw;
          background-color: rgba(0, 0, 0, 0.8);
        }

        #content.active {
          min-height: 0;
          height: calc(100% - 70px);
          overflow: hidden;
        }

        .overlay {
          z-index: 1199;
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          display: block;
          background-color: rgba(0, 0, 0, 0.8);
          overflow: hidden;
        }
      }

      @media (max-width: 576px) {
        #sidebar {
          margin-left: -240px;
        }

        #sidebar.hide {
          margin-left: 0;
        }

        #content {
          padding: 18px;
          width: 100%;
        }
      }

      .none {
        position: absolute;
        background-color: #fff;
        width: 100%;
        height: 100vh;
        overflow: auto;
      }

      @media (max-width: 576px) {
        .none {
          background-color: #fff;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }

      #sidebar[data-v-a51b6b00] {
        width: 240px;
        position: fixed;
        top: 70px;
        left: 0;
        height: calc(100vh - 70px);
        z-index: 998;
      }

      #sidebar.hide[data-v-a51b6b00] {
        margin-left: -240px;
      }

      #content[data-v-a51b6b00] {
        width: calc(100% - 240px);
        padding: 52px 50px;
        min-height: calc(100vh - 70px);
        transition: all 0.3s;
        position: absolute;
        top: 70px;
        right: 0;
        background: #e2efee;
      }

      #content.active[data-v-a51b6b00] {
        width: 100%;
      }

      #uploadLayoutHeader[data-v-a51b6b00] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 144px;
      }

      .fade-enter-active[data-v-a51b6b00],
      .fade-leave-active[data-v-a51b6b00] {
        transition-property: opacity;
        transition-duration: 0.25s;
      }

      .fade-enter-active[data-v-a51b6b00] {
        transition-delay: 0.25s;
      }

      .fade-enter[data-v-a51b6b00],
      .fade-leave-active[data-v-a51b6b00] {
        opacity: 0;
      }

      .container[data-v-a51b6b00] {
        box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.05);
        max-width: 1240px;
      }

      .container .upload-check-card-header[data-v-a51b6b00] {
        min-height: 92px;
        border-bottom: 1px solid #e2e2e2;
        padding: 0 50px;
      }

      .container
        .upload-check-card-header
        .upload-check-card-icon[data-v-a51b6b00] {
        width: 33px;
        height: 33px;
        margin-right: 12px;
      }

      .container
        .upload-check-card-header
        .upload-check-head-text[data-v-a51b6b00] {
        font-size: 20px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
      }

      .container .upload-check-card-header .step-circle[data-v-a51b6b00] {
        padding-top: 1px;
        width: 24px;
        height: 24px;
        font-family: Raleway;
        font-size: 13px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: -0.2px;
        text-align: center;
        background-color: #c3c3c3;
        color: #fff;
        margin-right: 6px;
      }

      .container .upload-check-card-header .item[data-v-a51b6b00] {
        font-family: Raleway;
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.2px;
        text-align: left;
        margin-top: -3px;
        color: #c3c3c3;
      }

      .container .upload-check-card-header .right-arrow[data-v-a51b6b00] {
        width: 7px;
        height: 12px;
        margin: 0 20px;
      }

      .container .upload-check-card-body[data-v-a51b6b00] {
        padding: 30px 50px 42px;
      }

      @media (max-width: 768px) {
        #sidebar[data-v-a51b6b00] {
          margin-left: -240px;
        }

        #sidebar.hide[data-v-a51b6b00] {
          margin-left: 0;
        }

        #content[data-v-a51b6b00] {
          padding: 52px 30px;
          width: 100%;
        }

        #content.active[data-v-a51b6b00] {
          min-height: calc(100vh - 70px - 52px);
          overflow-y: hidden;
        }

        .container .upload-check-card-header[data-v-a51b6b00] {
          padding: 0 30px;
        }

        .container .upload-check-card-body[data-v-a51b6b00] {
          padding: 30px 0 42px;
        }
      }

      @media (max-width: 621px) {
        #sidebar[data-v-a51b6b00] {
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 1200;
        }

        .overlay[data-v-a51b6b00] {
          z-index: 1199;
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          display: block;
          background-color: rgba(0, 0, 0, 0.8);
        }
      }

      @media (max-width: 576px) {
        #sidebar[data-v-a51b6b00] {
          margin-left: -240px;
        }

        #sidebar.hide[data-v-a51b6b00] {
          margin-left: 0;
        }

        #content[data-v-a51b6b00] {
          padding: 0;
          width: 100%;
          min-height: auto;
        }

        #content.active[data-v-a51b6b00] {
          min-height: calc(100vh - 70px - 52px);
          overflow-y: hidden;
        }

        .circle-warp[data-v-a51b6b00] {
          margin-left: 5px;
        }

        .container[data-v-a51b6b00] {
          box-shadow: none;
        }

        .container .upload-check-card-header[data-v-a51b6b00] {
          padding: 0 18px;
        }

        .container .upload-check-card-body[data-v-a51b6b00] {
          padding: 30px 0 42px;
        }
      }

      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.15s linear;
      }

      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }

      .input-group
        > .input-group-append:last-child
        > .b-dropdown:not(:last-child):not(.dropdown-toggle)
        > .btn,
      .input-group > .input-group-append:not(:last-child) > .b-dropdown > .btn,
      .input-group > .input-group-prepend > .b-dropdown > .btn {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .input-group > .input-group-append > .b-dropdown > .btn,
      .input-group
        > .input-group-prepend:first-child
        > .b-dropdown:not(:first-child)
        > .btn,
      .input-group
        > .input-group-prepend:not(:first-child)
        > .b-dropdown
        > .btn {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      input.form-control[type="color"],
      input.form-control[type="range"] {
        height: 2.25rem;
      }

      input.form-control.form-control-sm[type="color"],
      input.form-control.form-control-sm[type="range"] {
        height: 1.9375rem;
      }

      input.form-control.form-control-lg[type="color"],
      input.form-control.form-control-lg[type="range"] {
        height: 3rem;
      }

      input.form-control[type="color"] {
        padding: 0.25rem;
      }

      input.form-control.form-control-sm[type="color"] {
        padding: 0.125rem;
      }

      table.b-table.b-table-fixed {
        table-layout: fixed;
      }

      table.b-table[aria-busy="false"] {
        opacity: 1;
      }

      table.b-table[aria-busy="true"] {
        opacity: 0.6;
      }

      table.b-table > tfoot > tr > th,
      table.b-table > thead > tr > th {
        position: relative;
      }

      table.b-table > tfoot > tr > th.sorting,
      table.b-table > thead > tr > th.sorting {
        padding-right: 1.5em;
        cursor: pointer;
      }

      table.b-table > tfoot > tr > th.sorting:after,
      table.b-table > tfoot > tr > th.sorting:before,
      table.b-table > thead > tr > th.sorting:after,
      table.b-table > thead > tr > th.sorting:before {
        position: absolute;
        bottom: 0;
        display: block;
        opacity: 0.4;
        padding-bottom: inherit;
        font-size: inherit;
        line-height: 180%;
      }

      table.b-table > tfoot > tr > th.sorting:before,
      table.b-table > thead > tr > th.sorting:before {
        right: 0.75em;
        content: "\\2191";
      }

      table.b-table > tfoot > tr > th.sorting:after,
      table.b-table > thead > tr > th.sorting:after {
        right: 0.25em;
        content: "\\2193";
      }

      table.b-table > tfoot > tr > th.sorting_asc:after,
      table.b-table > tfoot > tr > th.sorting_desc:before,
      table.b-table > thead > tr > th.sorting_asc:after,
      table.b-table > thead > tr > th.sorting_desc:before {
        opacity: 1;
      }

      table.b-table.b-table-stacked {
        width: 100%;
      }

      table.b-table.b-table-stacked,
      table.b-table.b-table-stacked > caption,
      table.b-table.b-table-stacked > tbody,
      table.b-table.b-table-stacked > tbody > tr,
      table.b-table.b-table-stacked > tbody > tr > td,
      table.b-table.b-table-stacked > tbody > tr > th {
        display: block;
      }

      table.b-table.b-table-stacked > tbody > tr.b-table-bottom-row,
      table.b-table.b-table-stacked > tbody > tr.b-table-top-row,
      table.b-table.b-table-stacked > tfoot,
      table.b-table.b-table-stacked > thead {
        display: none;
      }

      table.b-table.b-table-stacked > tbody > tr > :first-child {
        border-top-width: 0.4rem;
      }

      table.b-table.b-table-stacked > tbody > tr > [data-label] {
        display: grid;
        grid-template-columns: 40% auto;
        grid-gap: 0.25rem 1rem;
      }

      table.b-table.b-table-stacked > tbody > tr > [data-label]:before {
        content: attr(data-label);
        display: inline;
        text-align: right;
        word-wrap: break-word;
        font-weight: 700;
        font-style: normal;
      }

      @media (max-width: 575.99px) {
        table.b-table.b-table-stacked-sm {
          width: 100%;
        }

        table.b-table.b-table-stacked-sm,
        table.b-table.b-table-stacked-sm > caption,
        table.b-table.b-table-stacked-sm > tbody,
        table.b-table.b-table-stacked-sm > tbody > tr,
        table.b-table.b-table-stacked-sm > tbody > tr > td,
        table.b-table.b-table-stacked-sm > tbody > tr > th {
          display: block;
        }

        table.b-table.b-table-stacked-sm > tbody > tr.b-table-bottom-row,
        table.b-table.b-table-stacked-sm > tbody > tr.b-table-top-row,
        table.b-table.b-table-stacked-sm > tfoot,
        table.b-table.b-table-stacked-sm > thead {
          display: none;
        }

        table.b-table.b-table-stacked-sm > tbody > tr > :first-child {
          border-top-width: 0.4rem;
        }

        table.b-table.b-table-stacked-sm > tbody > tr > [data-label] {
          display: grid;
          grid-template-columns: 40% auto;
          grid-gap: 0.25rem 1rem;
        }

        table.b-table.b-table-stacked-sm > tbody > tr > [data-label]:before {
          content: attr(data-label);
          display: inline;
          text-align: right;
          word-wrap: break-word;
          font-weight: 700;
          font-style: normal;
        }
      }

      @media (max-width: 767.99px) {
        table.b-table.b-table-stacked-md {
          width: 100%;
        }

        table.b-table.b-table-stacked-md,
        table.b-table.b-table-stacked-md > caption,
        table.b-table.b-table-stacked-md > tbody,
        table.b-table.b-table-stacked-md > tbody > tr,
        table.b-table.b-table-stacked-md > tbody > tr > td,
        table.b-table.b-table-stacked-md > tbody > tr > th {
          display: block;
        }

        table.b-table.b-table-stacked-md > tbody > tr.b-table-bottom-row,
        table.b-table.b-table-stacked-md > tbody > tr.b-table-top-row,
        table.b-table.b-table-stacked-md > tfoot,
        table.b-table.b-table-stacked-md > thead {
          display: none;
        }

        table.b-table.b-table-stacked-md > tbody > tr > :first-child {
          border-top-width: 0.4rem;
        }

        table.b-table.b-table-stacked-md > tbody > tr > [data-label] {
          display: grid;
          grid-template-columns: 40% auto;
          grid-gap: 0.25rem 1rem;
        }

        table.b-table.b-table-stacked-md > tbody > tr > [data-label]:before {
          content: attr(data-label);
          display: inline;
          text-align: right;
          word-wrap: break-word;
          font-weight: 700;
          font-style: normal;
        }
      }

      @media (max-width: 991.99px) {
        table.b-table.b-table-stacked-lg {
          width: 100%;
        }

        table.b-table.b-table-stacked-lg,
        table.b-table.b-table-stacked-lg > caption,
        table.b-table.b-table-stacked-lg > tbody,
        table.b-table.b-table-stacked-lg > tbody > tr,
        table.b-table.b-table-stacked-lg > tbody > tr > td,
        table.b-table.b-table-stacked-lg > tbody > tr > th {
          display: block;
        }

        table.b-table.b-table-stacked-lg > tbody > tr.b-table-bottom-row,
        table.b-table.b-table-stacked-lg > tbody > tr.b-table-top-row,
        table.b-table.b-table-stacked-lg > tfoot,
        table.b-table.b-table-stacked-lg > thead {
          display: none;
        }

        table.b-table.b-table-stacked-lg > tbody > tr > :first-child {
          border-top-width: 0.4rem;
        }

        table.b-table.b-table-stacked-lg > tbody > tr > [data-label] {
          display: grid;
          grid-template-columns: 40% auto;
          grid-gap: 0.25rem 1rem;
        }

        table.b-table.b-table-stacked-lg > tbody > tr > [data-label]:before {
          content: attr(data-label);
          display: inline;
          text-align: right;
          word-wrap: break-word;
          font-weight: 700;
          font-style: normal;
        }
      }

      @media (max-width: 1199.99px) {
        table.b-table.b-table-stacked-xl {
          width: 100%;
        }

        table.b-table.b-table-stacked-xl,
        table.b-table.b-table-stacked-xl > caption,
        table.b-table.b-table-stacked-xl > tbody,
        table.b-table.b-table-stacked-xl > tbody > tr,
        table.b-table.b-table-stacked-xl > tbody > tr > td,
        table.b-table.b-table-stacked-xl > tbody > tr > th {
          display: block;
        }

        table.b-table.b-table-stacked-xl > tbody > tr.b-table-bottom-row,
        table.b-table.b-table-stacked-xl > tbody > tr.b-table-top-row,
        table.b-table.b-table-stacked-xl > tfoot,
        table.b-table.b-table-stacked-xl > thead {
          display: none;
        }

        table.b-table.b-table-stacked-xl > tbody > tr > :first-child {
          border-top-width: 0.4rem;
        }

        table.b-table.b-table-stacked-xl > tbody > tr > [data-label] {
          display: grid;
          grid-template-columns: 40% auto;
          grid-gap: 0.25rem 1rem;
        }

        table.b-table.b-table-stacked-xl > tbody > tr > [data-label]:before {
          content: attr(data-label);
          display: inline;
          text-align: right;
          word-wrap: break-word;
          font-weight: 700;
          font-style: normal;
        }
      }

      table.b-table > tbody > tr.b-table-details > td {
        border-top: none;
      }

      .slick-slider {
        box-sizing: border-box;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
      }

      .slick-list,
      .slick-slider {
        position: relative;
        display: block;
      }

      .slick-list {
        overflow: hidden;
        margin: 0;
        padding: 0;
      }

      .slick-list:focus {
        outline: none;
      }

      .slick-list.dragging {
        cursor: pointer;
        cursor: hand;
      }

      .slick-slider .slick-list,
      .slick-slider .slick-track {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
      }

      .slick-track {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      .slick-track:after,
      .slick-track:before {
        display: table;
        content: "";
      }

      .slick-track:after {
        clear: both;
      }

      .slick-loading .slick-track {
        visibility: hidden;
      }

      .slick-slide {
        display: none;
        float: left;
        height: 100%;
        min-height: 1px;
      }

      [dir="rtl"] .slick-slide {
        float: right;
      }

      .slick-slide img {
        display: block;
      }

      .slick-slide.slick-loading img {
        display: none;
      }

      .slick-slide.dragging img {
        pointer-events: none;
      }

      .slick-initialized .slick-slide {
        display: block;
      }

      .slick-loading .slick-slide {
        visibility: hidden;
      }

      .slick-vertical .slick-slide {
        display: block;
        height: auto;
        border: 1px solid transparent;
      }

      .slick-arrow.slick-hidden {
        display: none;
      }

      .v-spinner .v-beat {
        -webkit-animation: v-beatStretchDelay 0.7s infinite linear;
        animation: v-beatStretchDelay 0.7s infinite linear;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
      }

      .v-spinner .v-beat-odd {
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
      }

      .v-spinner .v-beat-even {
        -webkit-animation-delay: 0.35s;
        animation-delay: 0.35s;
      }

      @-webkit-keyframes v-beatStretchDelay {
        50% {
          -webkit-transform: scale(0.75);
          transform: scale(0.75);
          -webkit-opacity: 0.2;
          opacity: 0.2;
        }

        to {
          -webkit-transform: scale(1);
          transform: scale(1);
          -webkit-opacity: 1;
          opacity: 1;
        }
      }

      @keyframes v-beatStretchDelay {
        50% {
          -webkit-transform: scale(0.75);
          transform: scale(0.75);
          -webkit-opacity: 0.2;
          opacity: 0.2;
        }

        to {
          -webkit-transform: scale(1);
          transform: scale(1);
          -webkit-opacity: 1;
          opacity: 1;
        }
      }
    </style>
  </head>

  <body>
    <div id="content">
      <div class="p-0 container">
        <div class="row">
          <div class="blog col-lg-12">
            <div class="content fr-view px-0">
              ${content}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lazy loading images -->
    <script>
        var inAdvance = 100;
        var images = document.getElementsByTagName('img'); 

        for(var i = 0; i < images.length; i++) {
          images[i].dataset.src = images[i].src;
          images[i].src = null; //stop loading all images in advance
        }

        function lazyLoad(isFirstLoad) {
          if (isFirstLoad) {
            inAdvance = 0;
          } else {
            inAdvance = 200;
          }
          for(var i = 0; i < images.length; i++) {
            var image = images[i];
            if (image.offsetTop < window.innerHeight + window.pageYOffset + inAdvance) {
              image.src = image.dataset.src;
            }
          }
        }

        lazyLoad(true);
        setTimeout(() => {
          lazyLoad(true);
          window.addEventListener('scroll', () => {
            lazyLoad(false);
          });
        }, 3000);

        setInterval(() => {
          window.ReactNativeWebView.postMessage('_webview_height_' + Math.max(
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.body.clientHeight,
            document.body.scrollHeight,
          ));
        }, 1000);
      </script>
  </body>
</html>
`;
