import React, { useRef, useEffect } from 'react';
import CitySearch from './CitySearch';

const RadioInput = ({ options, value, onChange }) => {
  // Handle both simple string values and object values with otherText
  const selectedValue = typeof value === 'object' && value !== null ? value.selected : value;
  const otherText = typeof value === 'object' && value !== null ? value.otherText : '';

  const hasOtherOption = options.some(opt => opt.value === 'other');
  const isOtherSelected = selectedValue === 'other';

  const handleOptionChange = (optionValue) => {
    if (optionValue === 'other') {
      onChange({ selected: 'other', otherText: otherText || '' });
    } else {
      onChange(optionValue);
    }
  };

  const handleOtherTextChange = (text) => {
    onChange({ selected: 'other', otherText: text });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleOptionChange(option.value)}
              className={`
                px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200
                border-2
                ${isSelected
                  ? 'bg-orange-600/20 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                  : 'bg-zinc-800/50 border-zinc-700 text-gray-300 hover:bg-zinc-700 hover:border-gray-500'}
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Show text input when "Other" is selected */}
      {hasOtherOption && isOtherSelected && (
        <div className="mt-3 animate-slide-up">
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleOtherTextChange(e.target.value)}
            placeholder="Please specify..."
            className="w-full bg-black border-2 border-orange-500/50 rounded-lg p-3 text-white placeholder:text-zinc-500 outline-none focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-300"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

const CheckboxInput = ({ options = [], groups = [], value = [], onChange, allowCustomInput }) => {
  // Handle both array of strings and object with selected array + otherText
  const selectedValues = Array.isArray(value) ? value : (value?.selected || []);
  const otherText = typeof value === 'object' && !Array.isArray(value) ? value.otherText : '';

  // Determine if we should show custom input (either explicit flag or 'other' option exists)
  // If using groups, we check if any group has 'other' OR if allowCustomInput is true
  const hasCustomInput = allowCustomInput || options.some(opt => opt.value === 'other') ||
    groups.some(g => g.options.some(opt => opt.value === 'other'));

  const isCustomInputActive = selectedValues.includes('heading_custom_input') || (hasCustomInput && selectedValues.includes('other')) || (allowCustomInput && otherText.length > 0);

  const handleChange = (optionValue) => {
    let newSelected;
    if (selectedValues.includes(optionValue)) {
      newSelected = selectedValues.filter((v) => v !== optionValue);
    } else {
      newSelected = [...selectedValues, optionValue];
    }

    // If "other" is in the new selection, return object format
    if (newSelected.includes('other') || (allowCustomInput && otherText)) {
      onChange({ selected: newSelected, otherText: otherText || '' });
    } else {
      onChange(newSelected);
    }
  };

  const handleCustomTextChange = (text) => {
    // Ensure we keep the state valid. If there's text, we treat it as if 'other' (or a custom key) is selected implicitely or we just store the text.
    // The existing pattern expects { selected: [...], otherText: ... }
    onChange({ selected: selectedValues, otherText: text });
  };

  // Helper to render a single option button
  const renderOptionBtn = (option) => {
    const isSelected = selectedValues.includes(option.value);
    return (
      <button
        key={option.value}
        onClick={() => handleChange(option.value)}
        className={`
          flex flex-col items-start px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200
          border-2 relative overflow-hidden w-full
          ${isSelected
            ? 'bg-cyan-900/30 border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
            : 'bg-zinc-800/50 border-zinc-700 text-gray-300 hover:bg-zinc-700 hover:border-gray-500'}
        `}
      >
        <div className="flex justify-between items-center w-full">
          <span className="font-bold text-base">{option.label || option.value}</span>
          {isSelected && (
            <span className="text-cyan-400 text-xs bg-cyan-900/50 px-2 py-0.5 rounded-full ml-2 shrink-0">
              Selected
            </span>
          )}
        </div>
        {option.description && (
          <span className="text-xs text-zinc-400 mt-1 block font-normal leading-relaxed">
            {option.description}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Render Groups if they exist */}
      {groups.length > 0 ? (
        <div className="space-y-8">
          {groups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              {group.group_name && (
                <h4 className="text-orange-400/80 text-sm font-bold uppercase tracking-widest border-b border-orange-500/20 pb-1 mb-3">
                  {group.group_name}
                </h4>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.options.map((opt) => renderOptionBtn(opt))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 2. Fallback to Flat List (original behavior) */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => renderOptionBtn(option))}
        </div>
      )}

      {/* 3. Custom Input / "Other" Field */}
      {hasCustomInput && (
        <div className="mt-4 pt-4 border-t border-zinc-800 animate-fade-in">
          <label className="block text-sm text-zinc-400 mb-2">
            {allowCustomInput ? "Cinematic Crush (write in):" : "Other:"}
          </label>
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleCustomTextChange(e.target.value)}
            placeholder="Type here..."
            className="w-full bg-black border-2 border-cyan-400/50 rounded-lg p-3 text-white placeholder:text-zinc-500 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};

const TextInput = ({ type = "text", placeholder, value = "", onChange, isHero }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`
      w-full bg-black border-2 rounded-lg outline-none transition-all duration-300
      placeholder:text-zinc-600 text-white
      ${isHero
        ? 'p-6 text-2xl border-orange-500/50 focus:border-orange-500 focus:shadow-[0_0_30px_rgba(249,115,22,0.2)] text-center'
        : 'p-4 border-zinc-700 focus:border-cyan-400 focus:bg-zinc-900'}
    `}
  />
);

const TextAreaInput = ({ placeholder, value = "", onChange }) => {
  const ref = useRef(null);

  // Auto-resize when value changes
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  const handleInput = (e) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
    onChange(el.value);
  };

  return (
    <textarea
      ref={ref}
      value={value}
      onInput={handleInput}
      placeholder={placeholder}
      rows={4}
      className="
        w-full bg-black border-2 border-zinc-700 rounded-lg p-4 
        text-white placeholder:text-zinc-600 outline-none 
        focus:border-cyan-400 focus:bg-zinc-900 transition-all duration-300
        resize-vertical min-h-[120px]
      "
      style={{ overflow: 'hidden' }}
    />
  );
};

const HeroCard = ({ question, value, onChange }) => (
  <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-fade-in">
    <div className="text-center space-y-4 max-w-xl">
      <div className="inline-block p-3 rounded-full bg-orange-500/10 mb-4">
        <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-orange-200 to-orange-400 pb-2">
        {question.text}
      </h3>
      {question.helpText && (
        <p className="text-xl text-zinc-400 font-light">{question.helpText}</p>
      )}
    </div>
    <div className="w-full max-w-md">
      <TextInput
        isHero
        value={value}
        onChange={onChange}
        placeholder="Type character name..."
      />
    </div>
  </div>
);

const HeroStart = ({ question, onNext }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
    <div className="w-32 h-32 md:w-48 md:h-48 mb-6 relative">
      {/* Fallback to text if image fails or is SVG */}
      <img
        src={question.image}
        alt="Logo"
        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]"
        style={{ boxSizing: 'content-box', borderRadius: '72px' }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>

    <div className="space-y-2">
      <h2 className="text-sm md:text-base tracking-[0.5em] text-orange-400 font-bold uppercase">
        {question.subtitle}
      </h2>
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg">
        {question.title}
      </h1>
    </div>

    <p className="text-lg md:text-xl text-zinc-400 max-w-lg font-light leading-relaxed">
      {question.text}
    </p>

    <button
      onClick={onNext}
      className="
        mt-8 px-12 py-4 bg-transparent border-2 border-orange-500 text-orange-400 
        text-xl font-bold tracking-widest uppercase rounded-none
        hover:bg-orange-500 hover:text-white transition-all duration-300
        shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]
      "
    >
      {question.buttonText}
    </button>
  </div>
);

const MultiEntryInput = ({ question, value = [], onChange, maxEntries = 5 }) => {
  const entries = Array.isArray(value) ? value : (value ? [value] : []);

  const handleEntryChange = (index, newValue) => {
    const newEntries = [...entries];
    newEntries[index] = newValue;
    onChange(newEntries.filter(e => e.trim() !== '')); // Remove empty entries
  };

  const handleAddEntry = () => {
    if (entries.length < maxEntries) {
      onChange([...entries, '']);
    }
  };

  const handleRemoveEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  // Always show at least one input field
  const displayEntries = entries.length > 0 ? entries : [''];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-fade-in">
      <div className="text-center space-y-4 max-w-xl">
        <div className="inline-block p-3 rounded-full bg-orange-500/10 mb-4">
          <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-orange-200 to-orange-400 pb-2">
          {question.text}
        </h3>
        {question.helpText && (
          <p className="text-xl text-zinc-400 font-light">{question.helpText}</p>
        )}
      </div>

      <div className="w-full max-w-md space-y-3">
        {displayEntries.map((entry, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={entry}
              onChange={(e) => handleEntryChange(index, e.target.value)}
              placeholder={`Character ${index + 1}...`}
              className="flex-1 bg-black border-2 border-orange-500/50 rounded-lg p-4 text-lg text-white placeholder:text-zinc-600 outline-none focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-300"
            />
            {entries.length > 1 && (
              <button
                onClick={() => handleRemoveEntry(index)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all"
                title="Remove"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}

        {entries.length < maxEntries && (
          <button
            onClick={handleAddEntry}
            className="w-full py-3 border-2 border-dashed border-orange-500/30 rounded-lg text-orange-400 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Another ({entries.length}/{maxEntries})
          </button>
        )}
      </div>
    </div>
  );
};

export const QuestionRenderer = ({ question, value, onChange, onNext, setGlobalAnswer }) => {
  // Hide manual inputs that are handled by CitySearch
  if (question.id === 'latitude' || question.id === 'longitude' || question.id === 'country') return null;

  if (question.type === 'hero_start') {
    return <HeroStart question={question} onNext={onNext} />;
  }

  if (question.uiType === 'hero_card') {
    return <HeroCard question={question} value={value} onChange={onChange} />;
  }

  // Handle multi-entry input (for character_match)
  if (question.uiType === 'multi_entry') {
    return <MultiEntryInput question={question} value={value} onChange={onChange} maxEntries={question.maxEntries || 5} />;
  }

  // Render CitySearch for the 'city' question
  if (question.id === 'city') {
    return (
      <CitySearch
        onLocationSelect={({ city, country, lat, lng }) => {
          if (setGlobalAnswer) {
            setGlobalAnswer('city', city);
            setGlobalAnswer('country', country);
            setGlobalAnswer('latitude', lat);
            setGlobalAnswer('longitude', lng);
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-3 animate-slide-up">
      <div className="mb-4">
        <label className="block text-lg font-semibold text-white mb-1">
          {question.text}
        </label>
        {question.helpText && (
          <p className="text-sm text-zinc-400 italic">{question.helpText}</p>
        )}
      </div>

      {question.type === 'radio' && (
        <RadioInput
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )}

      {question.type === 'checkbox' && (
        <CheckboxInput
          options={question.options}
          groups={question.options_groups}
          allowCustomInput={question.allow_custom_input}
          value={value}
          onChange={onChange}
        />
      )}

      {(question.type === 'text' || question.type === 'email') && (
        <TextInput
          type={question.type}
          placeholder={question.placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {/* New Inputs for Task 2 */}
      {question.type === 'date' && (
        <input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black border-2 border-zinc-700 rounded-lg p-4 text-white placeholder:text-zinc-600 outline-none focus:border-cyan-400 focus:bg-zinc-900 transition-all duration-300 [color-scheme:dark]"
        />
      )}

      {question.type === 'time' && (
        <input
          type="time"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black border-2 border-zinc-700 rounded-lg p-4 text-white placeholder:text-zinc-600 outline-none focus:border-cyan-400 focus:bg-zinc-900 transition-all duration-300 [color-scheme:dark]"
        />
      )}

      {question.type === 'number' && (
        <input
          type="number"
          step="any"
          placeholder={question.placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black border-2 border-zinc-700 rounded-lg p-4 text-white placeholder:text-zinc-600 outline-none focus:border-cyan-400 focus:bg-zinc-900 transition-all duration-300"
        />
      )}

      {question.type === 'textarea' && (
        <TextAreaInput
          placeholder={question.placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};
