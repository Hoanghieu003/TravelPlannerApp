package com.creatrip;

import android.content.Context;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.widget.TextView;

public class TextViewWithFont extends TextView {
  private String fontPath = "fonts/Raleway.ttf";
  public TextViewWithFont(Context context, AttributeSet attrs) {
    super(context, attrs);
    Typeface type = Typeface.createFromAsset(context.getAssets(), fontPath);
    this.setTypeface(type);
  }

  public TextViewWithFont(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
    Typeface type = Typeface.createFromAsset(context.getAssets(), fontPath);
    this.setTypeface(type);
  }

  public TextViewWithFont(Context context) {
    super(context);
    Typeface type = Typeface.createFromAsset(context.getAssets(), fontPath);
    this.setTypeface(type);
  }

}
